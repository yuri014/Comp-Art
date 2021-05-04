import React, { useContext, useEffect } from 'react';
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
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import Timeline from '@components/Splitter/Timeline';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import withAuth from '@hocs/withAuth';
import HomeContainer from './_styles';

const HomePage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const { theme } = useContext(ThemeContext);
  const [getLevel, { data: profileLevel }] = useLazyQuery(GET_LEVEL_XP, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    getLevel();
  }, [getLevel]);

  return (
    <ThemeProvider theme={theme === 'light' ? mainLightTheme : mainDarkTheme}>
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
          <MobileHeader loading={false} getLoggedProfile={getLoggedProfile} />
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

export default withAuth(HomePage);
