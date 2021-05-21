import { gql } from '@apollo/client';

export const LIKE_SHARE = gql`
  mutation LikeShare($id: ID!) {
    likeShare(id: $id)
  }
`;

export const DISLIKE_SHARE = gql`
  mutation DislikeShare($id: ID!) {
    dislikeShare(id: $id)
  }
`;

export const DELETE_SHARE = gql`
  mutation DeleteShare($id: ID!) {
    deleteShare(id: $id)
  }
`;
