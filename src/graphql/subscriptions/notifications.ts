import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription Notification {
    notification {
      _id
      from
      body
      read
      createdAt
      link
      avatar
    }
  }
`;
