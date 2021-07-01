import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Home from '@components/Home';
import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import Timeline from '@components/Timeline';
import { LevelProvider } from '@context/level';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_SEARCH_POSTS } from '@graphql/queries/search';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile } from '@interfaces/Profile';
import HomeContainer from '../home/_styles';

const TagPage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const {
    query: { query },
  } = useRouter();

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
              <Timeline
                query={GET_SEARCH_POSTS}
                queryName="searchPost"
                otherVariables={{ query: `#${query}` }}
              />
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

  if (jwtToken && !getProfile.data) {
    return {
      redirect: {
        destination: '/register-profile',
        permanent: false,
      },
    };
  }

  const { getLoggedProfile } = getProfile.data;

  return {
    props: {
      getLoggedProfile,
    },
  };
};

export default TagPage;
