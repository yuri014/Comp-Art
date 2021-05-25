import { gql } from '@apollo/client';

const CORE_NOTIFICATION_VIEW = gql`
  fragment CoreNotificationView on Notification {
    _id
    from
    body
    read
    createdAt
    link
    avatar
  }
`;

export default CORE_NOTIFICATION_VIEW;
