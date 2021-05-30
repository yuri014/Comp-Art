import { gql } from '@apollo/client';

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
  query SearchPost($query: String!, $offset: Int!) {
    searchPost(query: $query, offset: $offset) {
      _id
      description
      body
      likes {
        profile {
          name
          avatar
          _id
          owner
          bio
        }
      }
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        owner
        avatar
      }
      mediaId
      isLiked
      alt
    }
  }
`;
