import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';

import { GetServerSideProps } from 'next';
import Header from '../../components/Header';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import Home from '../../components/Home';
import LevelContext from '../../context/level';
import { ILoggedProfile, IProfile } from '../../interfaces/Profile';
import {
  GET_LEVEL_XP,
  GET_LOGGED_PROFILE,
} from '../../graphql/queries/profile';
import HomeContainer from '../home/_styles';
import ProfileSimpleCard from '../../components/ProfileCard';
import SearchContainer from './_styles';
import { initializeApollo } from '../../graphql/apollo/config';
import { Timeline } from '../../interfaces/Post';
import Post from '../../components/Post';
import { CORE_PROFILE_VIEW } from '../../graphql/fragments/profile';

const GET_SEARCH_PROFILE = gql`
  ${CORE_PROFILE_VIEW}
  query SearchProfiles($query: String!, $offset: Int!, $limit: Int!) {
    searchProfiles(query: $query, offset: $offset, limit: $limit) {
      ...CoreProfileView
      bio
    }
  }
`;

const GET_SEARCH_POSTS = gql`
  query SearchPost($query: String!, $offset: Int!) {
    searchPost(query: $query, offset: $offset) {
      _id
      description
      body
      likes {
        profile {
          name
          avatar
          _id
          owner
          bio
        }
      }
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        owner
        avatar
      }
      mediaId
      isLiked
      alt
    }
  }
`;

interface SearchPageProps extends ILoggedProfile {
  profiles: Array<IProfile>;
  posts: Array<Timeline>;
}

const SearchPage: React.FC<SearchPageProps> = ({
  profiles,
  posts,
  getLoggedProfile,
}) => {
  const {
    query: { query },
  } = useRouter();

  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      {getLoggedProfile ? (
        <>
          <Header getLoggedProfile={getLoggedProfile} />
          <LevelContext.Provider
            value={{ updateLevel: getLevel, level: profileLevel }}
          >
            <Home getLoggedProfile={getLoggedProfile}>
              <SearchContainer>
                <section className="profile-results">
                  <p className="title">Resultados para &quot;{query}&quot;</p>
                  <div className="profiles-container">
                    {profiles.map(profile => (
                      <ProfileSimpleCard profile={profile} />
                    ))}
                  </div>
                </section>
                <section className="posts-results">
                  {posts.map(post => (
                    <Post post={post} />
                  ))}
                </section>
              </SearchContainer>
            </Home>
            <MobileHeader loading={false} getLoggedProfile={getLoggedProfile} />
          </LevelContext.Provider>
        </>
      ) : (
        <>
          <Header />
          <Home>
            <p>TODO</p>
          </Home>
        </>
      )}
      <MobileFooter />
    </HomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context.params;
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getProfiles = await client.query({
    query: GET_SEARCH_PROFILE,
    variables: { query, offset: 0, limit: 0 },
    errorPolicy: 'ignore',
  });

  const getPosts = await client.query({
    query: GET_SEARCH_POSTS,
    variables: { query, offset: 0 },
    errorPolicy: 'ignore',
  });

  const getProfile = await client.query({
    query: GET_LOGGED_PROFILE,
    errorPolicy: 'ignore',
  });

  const profiles = getProfiles.data.searchProfiles;
  const posts = getPosts.data.searchPost;
  const { getLoggedProfile } = getProfile.data;

  if (jwtToken && !getLoggedProfile) {
    return {
      redirect: {
        destination: '/register-profile',
        permanent: false,
      },
    };
  }

  return {
    props: {
      profiles,
      posts,
      getLoggedProfile,
    },
  };
};

export default SearchPage;
