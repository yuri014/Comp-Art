import { useContext, useEffect } from 'react';
import { useQuery, gql, QueryResult } from '@apollo/client';
import { useRouter } from 'next/router';

import { NewNotificationsContext } from '@context/notification';
import { NOTIFICATIONS_SUBSCRIPTION } from '@graphql/subscriptions/notifications';
import {
  NotificationQuery,
  NotificationSubscription,
} from '@interfaces/Notifications';
import CORE_NOTIFICATION_VIEW from '@graphql/fragments/notifications';
import sendNotification from '@components/Notification/sendNotification';

const NOTIFICATIONS_QUERY = gql`
  ${CORE_NOTIFICATION_VIEW}
  query GetNotification($offset: Int!) {
    getNotifications(offset: $offset) {
      ...CoreNotificationView
    }
  }
`;

export interface UseNotifications {
  hasNewNotifications: number;
  data: NotificationQuery;
  fetchMore: ({
    variables: { offset: number },
  }) => Promise<{ data: NotificationQuery }>;
  loading: boolean;
}

const useNotifications = (): UseNotifications => {
  const router = useRouter();
  const { hasNewNotifications, setHasNewNotifications } = useContext(
    NewNotificationsContext,
  );
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
    const unsubscribe = subscribeToMore({
      document: NOTIFICATIONS_SUBSCRIPTION,
      updateQuery: (
        prev: NotificationQuery,
        {
          subscriptionData,
        }: { subscriptionData: QueryResult<NotificationSubscription> },
      ): NotificationQuery => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.notification;

        const hasDuplicateNotification = prev.getNotifications.some(
          not => not._id === newFeedItem._id,
        );

        if (!hasDuplicateNotification) {
          sendNotification(
            {
              body: newFeedItem.body,
              link: newFeedItem.link,
              title: 'Nova interação!',
            },
            router.push,
          );
        }

        const newNotifications = [
          newFeedItem,
          ...prev.getNotifications.filter(
            value => value._id !== newFeedItem._id,
          ),
        ];

        return {
          ...prev,
          getNotifications: newNotifications,
        };
      },
    });

    return () => unsubscribe();
  }, [data, loading, router.push, subscribeToMore]);

  useEffect(() => {
    if (!loading && data) {
      const newNotifications = data.getNotifications.filter(
        notification => notification.read !== true,
      );

      setHasNewNotifications(newNotifications.length);
    }
  }, [data, loading, setHasNewNotifications]);

  return { hasNewNotifications, data, fetchMore, loading };
};

export default useNotifications;
