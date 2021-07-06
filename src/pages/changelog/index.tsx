import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { initializeApollo } from '@graphql/apollo/config';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';

import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { LevelProvider } from '@context/level';
import { ILoggedProfile } from '@interfaces/Profile';
import ChangelogContainer from './_styles';
import Changelog from './_changelog.mdx';

const ChangelogPage: React.FC<ILoggedProfile> = ({ getLoggedProfile }) => (
  <ChangelogContainer>
    <Head>
      <title>Comp-Art</title>
    </Head>
    <Header getLoggedProfile={getLoggedProfile} />
    <LevelProvider>
      <main>
        <Changelog />
      </main>
      <MobileHeader getLoggedProfile={getLoggedProfile} />
    </LevelProvider>
    <MobileFooter />
  </ChangelogContainer>
);

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

export default ChangelogPage;
