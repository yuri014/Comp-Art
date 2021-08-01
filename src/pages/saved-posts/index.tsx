import React from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { gql } from '@apollo/client';

import Timeline from '@components/Timeline';
import { CORE_POST_VIEW, CORE_SHARE_VIEW } from '@graphql/fragments/posts';
import { ILoggedProfile } from '@interfaces/Profile';
import withHome from '@hocs/withHome';
import getLoggedUserWithAuth from '@ssr-functions/getLoggedUserWithAuth';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) =>
  getLoggedUserWithAuth(req);

export default withHome(SavedPosts);
