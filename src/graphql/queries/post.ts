import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($offset: Int!) {
    getPosts(offset: $offset) {
      _id
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
      isAudio
      isLiked
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  query GetProfilePosts($offset: Int!, $username: String!) {
    getProfilePosts(offset: $offset, username: $username) {
      _id
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
      isAudio
      avatar
      isLiked
    }
  }
`;
