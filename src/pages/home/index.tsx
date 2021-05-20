import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import { useLazyQuery } from '@apollo/client';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';

import LevelContext from '@context/level';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_LEVEL_XP, GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile } from '@interfaces/Profile';
import Header from '@components/Header';
import Home from '@components/Home';
import Timeline from '@components/Splitter/Timeline';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import HomeContainer from './_styles';

const MobileHeader = dynamic(() => import('@components/MobileHeader'));
const MobileFooter = dynamic(() => import('@components/MobileFooter'));

const HomePage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  return (
    <ThemeProvider theme={isDarkMode ? mainDarkTheme : mainLightTheme}>
      <HomeContainer>
        <Head>
          <title>Comp-Art</title>
        </Head>
        <Header getLoggedProfile={getLoggedProfile} />
        <LevelContext.Provider
          value={{ updateLevel: getLevel, level: profileLevel }}
        >
          <Home getLoggedProfile={getLoggedProfile}>
            <Timeline />
          </Home>
          <MobileHeader getLoggedProfile={getLoggedProfile} />
        </LevelContext.Provider>
        <MobileFooter />
      </HomeContainer>
    </ThemeProvider>
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

export default HomePage;
