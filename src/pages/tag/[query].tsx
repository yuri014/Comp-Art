import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';

import Home from '@components/Home';
import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import Post from '@components/Post';
import ArtistPost from '@components/Post/ArtistPost';
import LoadingPost from '@components/Post/LoadingPost';
import { LevelProvider } from '@context/level';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_SEARCH_POSTS } from '@graphql/queries/search';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { Timeline } from '@interfaces/Post';
import { ILoggedProfile } from '@interfaces/Profile';
import usePostsMutations from '@hooks/postMutations';
import HomeContainer from '../home/_styles';

interface SearchPost {
  searchPost: Array<Timeline>;
}

const TagPage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const {
    query: { query },
  } = useRouter();
  const { data, loading } = useQuery<SearchPost>(GET_SEARCH_POSTS, {
    variables: {
      query: `#${query}`,
      offset: 0,
    },
  });

  return (
    <HomeContainer>
      <Head>
        <title>#{query} - Comp-Art</title>
      </Head>
      {getLoggedProfile && (
        <>
          <Header getLoggedProfile={getLoggedProfile} />
          <LevelProvider>
            <Home getLoggedProfile={getLoggedProfile}>
              {loading || data.searchPost.length === 0 ? (
                <LoadingPost loading={loading} />
              ) : (
                data.searchPost.map(post => (
                  <Post useInteractions={usePostsMutations} post={post}>
                    <ArtistPost post={post} />
                  </Post>
                ))
              )}
            </Home>
            <MobileHeader getLoggedProfile={getLoggedProfile} />
          </LevelProvider>
        </>
      )}
      <MobileFooter />
    </HomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getProfile = await client.query({
    query: GET_LOGGED_PROFILE,
    errorPolicy: 'ignore',
  });

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
      getLoggedProfile,
    },
  };
};

export default TagPage;
