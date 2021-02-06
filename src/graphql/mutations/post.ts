import { gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation createPost($post: CreatePostInput!) {
    createPost(postInput: $post)
  }
`;

export const FAVORITE_POST = gql`
  mutation favoritePost($id: ID!) {
    favorite(id: $id)
  }
`;

export default CREATE_POST;
