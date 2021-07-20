import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';

import Timeline from '@components/Timeline';
import { CORE_POST_VIEW, CORE_SHARE_VIEW } from '@graphql/fragments/posts';
import { GET_LOGGED_PROFILE } from '@graphql/queries/profile';
import { initializeApollo } from '@graphql/apollo/config';
import { ILoggedProfile } from '@interfaces/Profile';
import withHome from '@hocs/withHome';

const GET_SAVED_POSTS = gql`
  ${CORE_POST_VIEW}
  ${CORE_SHARE_VIEW}

  query GetSavedPosts($offset: [Int]!) {
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

const SavedPosts: React.FC<ILoggedProfile> = () => (
  <>
    <Head>
      <title>Posts Salvos - Comp-Art</title>
    </Head>
    <Timeline query={GET_SAVED_POSTS} queryName="getSavedPosts" />
  </>
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

export default withHome(SavedPosts);
