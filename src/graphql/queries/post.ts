import { gql } from '@apollo/client';

const GET_POSTS = gql`
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

export default GET_POSTS;
