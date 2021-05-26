import React, { useContext, useEffect, useState } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FaBell } from 'react-icons/fa';
import { useQuery, gql, QueryResult } from '@apollo/client';
import { useRouter } from 'next/router';

import { NewNotificationsContext } from '@context/notification';
import { NOTIFICATIONS_SUBSCRIPTION } from '@graphql/subscriptions/notifications';
import {
  NotificationQuery,
  NotificationSubscription,
} from '@interfaces/Notifications';
import CORE_NOTIFICATION_VIEW from '@graphql/fragments/notifications';
import NotificationMenu from './NotificationMenu';
import updateNotificationQuery from './updateNotificationQuery';

const NOTIFICATIONS_QUERY = gql`
  ${CORE_NOTIFICATION_VIEW}
  query GetNotification($offset: Int!) {
    getNotifications(offset: $offset) {
      ...CoreNotificationView
    }
  }
`;

const Notification: React.FC = () => {
  const router = useRouter();
  const { hasNewNotifications, setHasNewNotifications } = useContext(
    NewNotificationsContext,
  );
  const [openMenu, setOpenMenu] = useState(false);
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
        ) => updateNotificationQuery(prev, subscriptionData, router.push),
      });
    }
  }, [data, loading, router.push, subscribeToMore]);

  useEffect(() => {
    if (!loading && data) {
      const newNotifications = data.getNotifications.filter(
        notification => notification.read !== true,
      );

      setHasNewNotifications(newNotifications.length);
    }
  }, [data, loading, setHasNewNotifications]);

  return (
    <>
      <IconButton
        aria-controls="menu-notification"
        aria-haspopup="true"
        aria-label="Abrir menu de notificações"
        color="secondary"
        onClick={() => setOpenMenu(true)}
      >
        <Badge
          color="primary"
          variant="dot"
          invisible={hasNewNotifications === 0}
        >
          <FaBell />
        </Badge>
      </IconButton>
      <NotificationMenu
        data={data}
        fetchMore={fetchMore}
        loading={loading}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
      />
    </>
  );
};

export default React.memo(Notification);
