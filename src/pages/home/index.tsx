import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core';

import LevelContext from '@context/level';
import ThemeContext from '@context/theme';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile } from '@interfaces/Profile';
import Header from '@components/Header';
import Home from '@components/Home';
import Timeline from '@components/Timeline';
import CreatePost from '@components/CreatePost';
import { AuthContext } from '@context/auth';
import { GET_POSTS } from '@graphql/queries/post';
import useGetLevel from '@hooks/getLevel';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import HomeContainer from './_styles';

const MobileHeader = dynamic(() => import('@components/MobileHeader'));
const MobileFooter = dynamic(() => import('@components/MobileFooter'));

const HomePage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  const { getLevel, profileLevel } = useGetLevel();

  useEffect(() => {
    const getNotificationPermission = async () => {
      if (Notification.permission !== 'denied') {
        await Notification.requestPermission();
      }
    };

    getNotificationPermission();
  }, []);

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
            <>
              {auth.user && auth.user.isArtist && (
                <CreatePost getLoggedProfile={getLoggedProfile} />
              )}
              <Timeline query={GET_POSTS} queryName="getPosts" />
            </>
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
