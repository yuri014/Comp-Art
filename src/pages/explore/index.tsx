import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { LevelProvider } from '@context/level';
import Timeline from '@components/Timeline';
import { GET_EXPLORE_POSTS } from '@graphql/queries/post';
import { initializeApollo } from '@graphql/apollo/config';
import { ILoggedProfile } from '@interfaces/Profile';
import Home from '@components/Home';
import Header from '@components/Header';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import HomeContainer from '../home/_styles';

const Explore: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => (
  <HomeContainer>
    <Head>
      <title>Explorar - Comp-Art</title>
    </Head>
    <Header getLoggedProfile={getLoggedProfile} />
    <LevelProvider>
      <Home getLoggedProfile={getLoggedProfile}>
        <Timeline query={GET_EXPLORE_POSTS} queryName="getExplorePosts" />
      </Home>
      <MobileHeader getLoggedProfile={getLoggedProfile} />
    </LevelProvider>
    <MobileFooter />
  </HomeContainer>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwtToken } = req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      getLoggedProfile,
    },
  };
};

export default Explore;
