import React, { useEffect, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

import { INotification } from '@interfaces/Notifications';
import formatDistanceTimePass from '@utils/formatDistanceTimePass';
import { NotificationContainer } from './styles';

interface NotificationItemProps {
  notification: INotification;
}

const READ_NOTIFICATION = gql`
  mutation ReadNotification($id: ID!) {
    readNotification(notificationID: $id)
  }
`;

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const [read, setRead] = useState(null);
  const [readNotification] = useMutation(READ_NOTIFICATION, {
    onCompleted: () => {
      setRead(true);
    },
    variables: {
      id: notification._id,
    },
  });

  useEffect(() => {
    setRead(notification.read);
  }, [notification.read]);

  return (
    <NotificationContainer>
      <button type="button" onClick={() => readNotification()}>
        <img
          src={process.env.NEXT_PUBLIC_API_HOST + notification.avatar}
          alt="Teste"
        />
        <div>
          <div className="head">
            <strong>{notification.from}</strong>
            <p>&nbsp;{notification.body}</p>
          </div>
          <span>{formatDistanceTimePass(notification.createdAt)}</span>
        </div>
        {!read && <div className="new" />}
      </button>
    </NotificationContainer>
  );
};

export default React.memo(NotificationItem);
