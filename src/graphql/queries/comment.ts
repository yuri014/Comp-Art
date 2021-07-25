import { gql } from '@apollo/client';
import { CORE_PROFILE_VIEW } from '@graphql/fragments/profile';

const GET_COMMENTS = gql`
  ${CORE_PROFILE_VIEW}
  query GetComments($id: ID!, $offset: Int!) {
    getComments(postID: $id, offset: $offset) {
      _id
      author {
        ...CoreProfileView
      }
      body
      createdAt
    }
  }
`;

export default GET_COMMENTS;
