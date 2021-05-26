import React, { useEffect } from 'react';
import { Badge, IconButton, Menu } from '@material-ui/core';
import { FaBell } from 'react-icons/fa';
import { useQuery, gql, QueryResult } from '@apollo/client';

import { NOTIFICATIONS_SUBSCRIPTION } from '@graphql/subscriptions/notifications';
import {
  NotificationQuery,
  NotificationSubscription,
} from '@interfaces/Notifications';
import CORE_NOTIFICATION_VIEW from '@graphql/fragments/notifications';
import useInfiniteScroll from '@hooks/infiniteScroll';
import NotificationItem from './NotificationItem';

const NOTIFICATIONS_QUERY = gql`
  ${CORE_NOTIFICATION_VIEW}
  query GetNotification($offset: Int!) {
    getNotifications(offset: $offset) {
      ...CoreNotificationView
    }
  }
`;

const Notification: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const {
    data,
    loading,
    subscribeToMore,
    fetchMore,
  } = useQuery<NotificationQuery>(NOTIFICATIONS_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const lastNotificationRef = useInfiniteScroll(data, async () => {
    if (data.getNotifications.length === 4) {
      const newPosts = await fetchMore({
        variables: { offset: data.getNotifications.length },
      });
      return newPosts.data.getNotifications.length === 4;
    }

    return false;
  });

  useEffect(() => {
    if (!loading && data) {
      subscribeToMore({
        document: NOTIFICATIONS_SUBSCRIPTION,
        variables: { offset: data.getNotifications.length },
        updateQuery: (
          prev,
          {
            subscriptionData,
          }: { subscriptionData: QueryResult<NotificationSubscription> },
        ) => {
          if (!subscriptionData.data) return prev;
          const newFeedItem = subscriptionData.data.notification;
          return {
            ...prev,
            getNotifications: [newFeedItem, ...prev.getNotifications],
          };
        },
      });
    }
  }, [data, loading, subscribeToMore]);

  return (
    <>
      <IconButton
        aria-controls="menu-notification"
        aria-haspopup="true"
        aria-label="Abrir menu de notificações"
        onClick={handleClick}
        color="secondary"
      >
        <Badge color="primary" variant="dot" invisible={!data}>
          <FaBell />
        </Badge>
      </IconButton>
      {!loading && data && (
        <Menu
          id="menu-header"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: '24.5rem',
            },
          }}
        >
          {data.getNotifications.map((notification, index) => {
            if (data.getNotifications.length === index + 1) {
              return (
                <NotificationItem
                  notification={notification}
                  lastNotificationRef={lastNotificationRef}
                />
              );
            }

            return <NotificationItem notification={notification} />;
          })}
        </Menu>
      )}
    </>
  );
};

export default Notification;
