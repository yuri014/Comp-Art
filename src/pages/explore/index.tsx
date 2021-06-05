import React, { useContext, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ThemeProvider } from '@material-ui/core';

import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import LevelContext from '@context/level';
import Timeline from '@components/Timeline';
import { GET_EXPLORE_POSTS } from '@graphql/queries/post';
import { GET_LEVEL_XP } from '@graphql/queries/profile';
import { initializeApollo } from '@graphql/apollo/config';
import { ILoggedProfile } from '@interfaces/Profile';
import Home from '@components/Home';
import Header from '@components/Header';
import ThemeContext from '@context/theme';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import HomeContainer from '../home/_styles';

const Explore: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
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
          <title>Explorar - Comp-Art</title>
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
    </ThemeProvider>
  );
};

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
