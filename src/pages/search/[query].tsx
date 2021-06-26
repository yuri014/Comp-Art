import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import Header from '@components/Header';
import Home from '@components/Home';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import Post from '@components/Post';
import ProfileSimpleCard from '@components/ProfileCard';
import ArtistPost from '@components/Post/ArtistPost';
import usePostsMutations from '@hooks/postMutations';
import { LevelProvider } from '@context/level';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_SEARCH_PROFILE, GET_SEARCH_POSTS } from '@graphql/queries/search';
import { Timeline } from '@interfaces/Post';
import { ILoggedProfile, IProfile } from '@interfaces/Profile';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import HomeContainer from '../home/_styles';
import { SearchContainer } from './_styles';

interface SearchProps extends ILoggedProfile {
  profiles: Array<IProfile>;
  posts: Array<Timeline>;
}

const Search: React.FC<SearchProps> = ({
  profiles,
  posts,
  getLoggedProfile,
}) => {
  const {
    query: { query },
  } = useRouter();

  return (
    <HomeContainer>
      <Head>
        <title>{query} - Comp-Art</title>
      </Head>
      {getLoggedProfile ? (
        <>
          <Header getLoggedProfile={getLoggedProfile} />
          <LevelProvider>
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
                    <Post useInteractions={usePostsMutations} post={post}>
                      <ArtistPost post={post} />
                    </Post>
                  ))}
                </section>
              </SearchContainer>
            </Home>
            <MobileHeader getLoggedProfile={getLoggedProfile} />
          </LevelProvider>
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
    variables: { query, offset: 0, limit: 10 },
    errorPolicy: 'ignore',
  });

  const getPosts = await client.query({
    query: GET_SEARCH_POSTS,
    variables: { query, offset: 0 },
    errorPolicy: 'ignore',
  });

  const profiles = getProfiles.data.searchProfiles;
  const posts = getPosts.data.searchPost;
  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      profiles,
      posts,
      getLoggedProfile,
    },
  };
};

export default Search;
