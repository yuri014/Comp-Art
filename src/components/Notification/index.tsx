import React, { useEffect } from 'react';
import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core';
import { FaBell } from 'react-icons/fa';
import { useQuery, gql, QueryResult } from '@apollo/client';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';

import { NOTIFICATIONS_SUBSCRIPTION } from '@graphql/subscriptions/notifications';
import CORE_NOTIFICATION_VIEW from '@graphql/fragments/notifications';
import useInfiniteScroll from '@hooks/infiniteScroll';
import NotificationContainer from './styles';

interface INotification {
  _id: string;
  from: string;
  body: string;
  read: boolean;
  createdAt: string;
  link: string;
  avatar: string;
}

interface NotificationQuery {
  getNotifications: INotification[];
}

interface NotificationSubscription {
  notification: INotification;
}

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
              maxHeight: '40rem',
            },
          }}
        >
          {data.getNotifications.map((notification, index) => {
            if (data.getNotifications.length === index + 1) {
              return (
                <MenuItem>
                  <NotificationContainer ref={lastNotificationRef}>
                    <Link href={`/profile/${notification.link}`}>
                      <a>
                        <img
                          src={
                            process.env.NEXT_PUBLIC_API_HOST +
                            notification.avatar
                          }
                          alt="Teste"
                        />
                        <div>
                          <div className="head">
                            <strong>{notification.from}</strong>
                            <p>&nbsp;{notification.body}</p>
                          </div>
                          <span>
                            {formatDistance(
                              new Date(),
                              new Date(notification.createdAt),
                              {
                                locale: ptBR,
                                addSuffix: true,
                              },
                            )}
                          </span>
                        </div>
                        {!notification.read && <div className="new" />}
                      </a>
                    </Link>
                  </NotificationContainer>
                </MenuItem>
              );
            }

            return (
              <MenuItem>
                <NotificationContainer>
                  <Link href={`/profile/${notification.link}`}>
                    <a>
                      <img
                        src={
                          process.env.NEXT_PUBLIC_API_HOST + notification.avatar
                        }
                        alt="Teste"
                      />
                      <div>
                        <div className="head">
                          <strong>{notification.from}</strong>
                          <p>&nbsp;{notification.body}</p>
                        </div>
                        <span>
                          {formatDistance(
                            new Date(),
                            new Date(notification.createdAt),
                            {
                              locale: ptBR,
                              addSuffix: true,
                            },
                          )}
                        </span>
                      </div>
                      {!notification.read && <div className="new" />}
                    </a>
                  </Link>
                </NotificationContainer>
              </MenuItem>
            );
          })}
        </Menu>
      )}
    </>
  );
};

export default Notification;
