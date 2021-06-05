import React, { useContext } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { ThemeProvider } from '@material-ui/core';
import { gql } from '@apollo/client';

import Header from '@components/Header';
import Home from '@components/Home';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import Timeline from '@components/Timeline';
import LevelContext from '@context/level';
import mainDarkTheme from '@styles/themes/MainDarkTheme';
import mainLightTheme from '@styles/themes/MainLightTheme';
import ThemeContext from '@context/theme';
import { CORE_POST_VIEW, CORE_SHARE_VIEW } from '@graphql/fragments/posts';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { initializeApollo } from '@graphql/apollo/config';
import useGetLevel from '@hooks/getLevel';
import { ILoggedProfile } from '@interfaces/Profile';
import HomeContainer from '../home/_styles';

const GET_SAVED_POSTS = gql`
  ${CORE_POST_VIEW}
  ${CORE_SHARE_VIEW}

  query GetSavedPosts($offset: Int!) {
    getSavedPosts(offset: $offset) {
      ... on Post {
        ...CorePostView
      }
      ... on Share {
        ...CoreShareView
      }
    }
  }
`;

const SavedPosts: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { getLevel, profileLevel } = useGetLevel();

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
            <Timeline query={GET_SAVED_POSTS} queryName="getSavedPosts" />
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

export default SavedPosts;
