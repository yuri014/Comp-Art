import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import Timeline from '@components/Timeline';
import { GET_EXPLORE_POSTS } from '@graphql/queries/post';
import { initializeApollo } from '@graphql/apollo/config';
import { ILoggedProfile } from '@interfaces/Profile';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import withHome from '@hocs/withHome';

const Explore: React.FC<ILoggedProfile> = () => (
  <>
    <Head>
      <title>Explorar - Comp-Art</title>
    </Head>
    <Timeline query={GET_EXPLORE_POSTS} queryName="getExplorePosts" />
  </>
);

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

export default withHome(Explore);
