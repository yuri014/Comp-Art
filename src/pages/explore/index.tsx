import React, { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import LevelContext from '@context/level';
import Timeline from '@components/Timeline';
import { GET_EXPLORE_POSTS } from '@graphql/queries/post';
import { GET_LOGGED_PROFILE, GET_LEVEL_XP } from '@graphql/queries/profile';
import { initializeApollo } from '@graphql/apollo/config';
import { ILoggedProfile } from '@interfaces/Profile';
import Home from '@components/Home';
import Header from '@components/Header';
import HomeContainer from '../home/_styles';

const Explore: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
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
      <Header getLoggedProfile={getLoggedProfile} />
      <LevelContext.Provider
        value={{ updateLevel: getLevel, level: profileLevel }}
      >
        <Home getLoggedProfile={getLoggedProfile}>
          <Timeline query={GET_EXPLORE_POSTS} queryName="getExplorePosts" />
        </Home>
        <MobileHeader getLoggedProfile={getLoggedProfile} />
      </LevelContext.Provider>
      <MobileFooter />
    </HomeContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { jwtToken } = req.cookies;

  if (!jwtToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

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

export default Explore;
