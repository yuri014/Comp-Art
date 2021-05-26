import { QueryResult } from '@apollo/client';

import {
  NotificationQuery,
  NotificationSubscription,
} from '@interfaces/Notifications';
import sendNotification from './sendNotification';

const updateNotificationQuery = (
  prev: NotificationQuery,
  subscriptionData: QueryResult<NotificationSubscription>,
  callback: (url: string) => Promise<boolean>,
): NotificationQuery => {
  if (!subscriptionData.data) return prev;
  const newFeedItem = subscriptionData.data.notification;

  sendNotification(
    {
      body: newFeedItem.body,
      link: newFeedItem.link,
      title: 'Nova interação!',
    },
    callback,
  );

  return {
    ...prev,
    getNotifications: [newFeedItem, ...prev.getNotifications],
  };
};

export default updateNotificationQuery;
