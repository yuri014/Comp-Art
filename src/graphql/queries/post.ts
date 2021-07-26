import { gql } from '@apollo/client';
import { CORE_POST_VIEW, CORE_SHARE_VIEW } from '@graphql/fragments/posts';
import { MODAL_PROFILE } from '@graphql/fragments/profile';

export const GET_POST = gql`
  ${CORE_POST_VIEW}
  query GetPost($id: ID!) {
    getPost(id: $id) {
      ...CorePostView
    }
  }
`;

export const GET_POSTS = gql`
  ${CORE_POST_VIEW}
  ${CORE_SHARE_VIEW}
  query GetPosts($offset: [Int]!) {
    getPosts(offset: $offset) {
      ... on Post {
        ...CorePostView
      }
      ... on Share {
        ...CoreShareView
      }
    }
  }
`;

export const GET_EXPLORE_POSTS = gql`
  ${CORE_POST_VIEW}
  query GetExplorePosts($offset: Int!) {
    getExplorePosts(offset: $offset) {
      ...CorePostView
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  ${CORE_POST_VIEW}
  query GetProfilePosts($offset: Int!, $username: String!) {
    getProfilePosts(offset: $offset, username: $username) {
      ...CorePostView
    }
  }
`;

export const GET_PROFILE_POSTS_AND_SHARES = gql`
  ${CORE_POST_VIEW}
  ${CORE_SHARE_VIEW}
  query GetProfilePostsAndShares($offset: [Int]!, $username: String!) {
    getProfilePostsAndShares(offset: $offset, username: $username) {
      ... on Post {
        ...CorePostView
      }
      ... on Share {
        ...CoreShareView
      }
    }
  }
`;

export const GET_LIKES = gql`
  ${MODAL_PROFILE}
  query GetLikes($id: ID!, $offset: Int!) {
    getLikes(postID: $id, offset: $offset) {
      ...ModalProfile
    }
  }
`;

export const GET_WHO_SHARE_POST = gql`
  ${MODAL_PROFILE}
  query GetWhoSharesPost($id: ID!, $offset: Int!) {
    getWhoSharesPost(postID: $id, offset: $offset) {
      ...ModalProfile
    }
  }
`;
