import { gql } from '@apollo/client';

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
  query GetLikes($id: ID!, $offset: Int!) {
    getLikes(postID: $id, offset: $offset) {
      name
      avatar
      bio
      owner
      level
    }
  }
`;
