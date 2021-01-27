import { gql } from '@apollo/client';

const GET_POSTS = gql`
  query GetPosts($offset: Int!) {
    getPosts(offset: $offset) {
      description
      body
      likes {
        username
        avatar
        createdAt
      }
      sharedCount
      createdAt
      artist
    }
  }
`;

export default GET_POSTS;
