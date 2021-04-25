import React, { useContext, useEffect } from 'react';
import Head from 'next/head';
import { useLazyQuery } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { ThemeProvider } from '@material-ui/core';
import Header from '../../components/Header';
import HomeContainer from './_styles';
import MobileHeader from '../../components/MobileHeader';
import MobileFooter from '../../components/MobileFooter';
import withAuth from '../../hocs/withAuth';
import Home from '../../components/Home';
import LevelContext from '../../context/level';
import {
  GET_LEVEL_XP,
  GET_LOGGED_PROFILE,
} from '../../graphql/queries/profile';
import Timeline from '../../components/Splitter/Timeline';
import { initializeApollo } from '../../graphql/apollo/config';
import { ILoggedProfile } from '../../interfaces/Profile';
import ThemeContext from '../../context/theme';
import mainLightTheme from '../../styles/themes/MainLightTheme';
import mainDarkTheme from '../../styles/themes/MainDarkTheme';

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

export default withAuth(HomePage);
