import { gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(postInput: $post)
  }
`;

export default CREATE_POST;
