import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import Header from '@components/Header';
import MobileFooter from '@components/MobileFooter';
import MobileHeader from '@components/MobileHeader';
import { LevelProvider } from '@context/level';
import { ILoggedProfile } from '@interfaces/Profile';
import getLoggedUserWithAuth from '@ssr-functions/getLoggedUserWithAuth';
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

export const getServerSideProps: GetServerSideProps = async ({ req }) =>
  getLoggedUserWithAuth(req);

export default ChangelogPage;
