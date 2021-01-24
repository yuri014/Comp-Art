import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(postInput: $post)
  }
`;
