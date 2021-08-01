import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Notification from '@components/Notification';
import useNotifications from '@hooks/useNotifications';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { ILoggedProfile } from '@interfaces/Profile';
import getLoggedUserWithAuth from '@ssr-functions/getLoggedUserWithAuth';
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

export const getServerSideProps: GetServerSideProps = async ({ req }) =>
  getLoggedUserWithAuth(req);

export default NotificationPage;
