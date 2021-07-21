import React, { useContext, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ILoggedProfile } from '@interfaces/Profile';
import Timeline from '@components/Timeline';
import CreatePost from '@components/CreatePost';
import { AuthContext } from '@context/auth';
import { GET_POSTS } from '@graphql/queries/post';
import withHome from '@hocs/withHome';
import getLoggedUserWithAuth from '@ssr-functions/getLoggedUserWithAuth';

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
    <>
      <Head>
        <title>Comp-Art</title>
      </Head>
      <>
        {auth.user && auth.user.isArtist && (
          <CreatePost getLoggedProfile={getLoggedProfile} />
        )}
        <Timeline query={GET_POSTS} queryName="getPosts" />
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) =>
  getLoggedUserWithAuth(req);

export default withHome(HomePage);
