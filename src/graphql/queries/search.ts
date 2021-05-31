import { gql } from '@apollo/client';
import { CORE_POST_VIEW } from '@graphql/fragments/posts';

import { CORE_PROFILE_VIEW } from '@graphql/fragments/profile';

export const GET_SEARCH_PROFILE = gql`
  ${CORE_PROFILE_VIEW}
  query SearchProfiles($query: String!, $offset: Int!, $limit: Int!) {
    searchProfiles(query: $query, offset: $offset, limit: $limit) {
      ...CoreProfileView
      bio
    }
  }
`;

export const GET_SEARCH_POSTS = gql`
  ${CORE_POST_VIEW}
  query SearchPost($query: String!, $offset: Int!) {
    searchPost(query: $query, offset: $offset) {
      ... on Post {
        ...CorePostView
      }
    }
  }
`;
