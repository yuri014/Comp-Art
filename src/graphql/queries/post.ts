import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($offset: Int!) {
    getPosts(offset: $offset) {
      description
      body
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        username
      }
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  query GetPosts($offset: Int!, $username: String!) {
    getProfilePosts(offset: $offset, username: $username) {
      description
      body
      likesCount
      sharedCount
      commentsCount
      createdAt
      artist {
        name
        username
      }
    }
  }
`;

export default GET_POSTS;
