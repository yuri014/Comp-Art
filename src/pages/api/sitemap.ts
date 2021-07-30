import type { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';

import { initializeApollo } from '@graphql/apollo/config';

export const GET_ALL_PROFILES = gql`
  query GetAllProfiles {
    getAllProfiles {
      owner
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    getAllPosts {
      _id
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const client = initializeApollo();

  const {
    data: { getAllProfiles },
  } = await client.query({ query: GET_ALL_PROFILES });
  const profiles = getAllProfiles;

  const {
    data: { getAllPosts },
  } = await client.query({ query: GET_ALL_POSTS });
  const posts = getAllPosts;

  return res.status(200).json({ profiles, posts });
}
