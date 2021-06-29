import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Notification from '@components/Notification';
import useNotifications from '@hooks/useNotifications';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { ILoggedProfile } from '@interfaces/Profile';
import NotificationPageContainer from './_styles';

const NotificationPage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => {
  const { data, fetchMore, loading } = useNotifications();

  return (
    <NotificationPageContainer>
      <Head>
        <title>Notificações - Comp-Art</title>
      </Head>
      <MobileHeader getLoggedProfile={getLoggedProfile} />
      <main>
        <Notification data={data} fetchMore={fetchMore} loading={loading} />
      </main>
      <MobileFooter />
    </NotificationPageContainer>
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

export default NotificationPage;
