import React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Timeline from '@components/Timeline';
import { initializeApollo } from '@graphql/apollo/config';
import { GET_SEARCH_POSTS } from '@graphql/queries/search';
import getLoggedUserWithNoAuth from '@ssr-functions/getLoggedUserWithNoAuth';
import { ILoggedProfile } from '@interfaces/Profile';
import withHome from '@hocs/withHome';

const TagPage: React.FC<ILoggedProfile> = () => {
  const {
    query: { query },
  } = useRouter();

  return (
    <>
      <Head>
        <title>#{query} - Comp-Art</title>
      </Head>
      <Timeline
        query={GET_SEARCH_POSTS}
        queryName="searchPost"
        otherVariables={{ query: `#${query}` }}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const { jwtToken } = context.req.cookies;

  const client = initializeApollo(null, jwtToken);

  const getLoggedProfile = await getLoggedUserWithNoAuth(jwtToken, client);

  return {
    props: {
      getLoggedProfile,
    },
  };
};

export default withHome(TagPage);
