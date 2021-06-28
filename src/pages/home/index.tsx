import React, { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { LevelProvider } from '@context/level';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile } from '@interfaces/Profile';
import Header from '@components/Header';
import Home from '@components/Home';
import Timeline from '@components/Timeline';
import CreatePost from '@components/CreatePost';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { AuthContext } from '@context/auth';
import { GET_POSTS } from '@graphql/queries/post';
import HomeContainer from './_styles';

const HomePage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const auth = useContext(AuthContext);

  useEffect(() => {
    const getNotificationPermission = async () => {
      if (Notification.permission !== 'denied') {
        await Notification.requestPermission();
      }
    };

    getNotificationPermission();
  }, []);

  return (
    <HomeContainer>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <Header getLoggedProfile={getLoggedProfile} />
      <LevelProvider>
        <Home getLoggedProfile={getLoggedProfile}>
          <>
            {auth.user && auth.user.isArtist && (
              <CreatePost getLoggedProfile={getLoggedProfile} />
            )}
            <Timeline query={GET_POSTS} queryName="getPosts" />
          </>
        </Home>
        <MobileHeader getLoggedProfile={getLoggedProfile} />
      </LevelProvider>
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

export default HomePage;
