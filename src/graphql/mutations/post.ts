import { gql } from '@apollo/client';
import { MODAL_PROFILE } from '@graphql/fragments/profile';

export const CREATE_POST = gql`
  mutation CreatePost($post: CreatePostInput!) {
    createPost(postInput: $post)
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    like(id: $id)
  }
`;

export const DISLIKE_POST = gql`
  mutation DislikePost($id: ID!) {
    dislike(id: $id)
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
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
