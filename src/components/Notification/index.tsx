import React from 'react';

import useInfiniteScroll from '@hooks/infiniteScroll';
import { NotificationQuery } from '@interfaces/Notifications';
import NotificationItem from './NotificationItem';

interface NotificationProps {
  data: NotificationQuery;
  fetchMore: ({
    variables: { offset: number },
  }) => Promise<{ data: NotificationQuery }>;
  loading: boolean;
  openMenu: boolean;
  setOpenMenu: (value: React.SetStateAction<boolean>) => void;
}

const Notification: React.FC<NotificationProps> = ({
  data,
  loading,
  fetchMore,
}) => {
  const lastNotificationRef = useInfiniteScroll(data, async () => {
    if (data.getNotifications.length === 4) {
      const newNotifications = await fetchMore({
        variables: { offset: data.getNotifications.length + 1 },
      });
      return newNotifications.data.getNotifications.length === 4;
    }

    return false;
  });

  return (
    <>
      {!loading && data && (
        <>
          {data.getNotifications.map((notification, index) => {
            if (data.getNotifications.length === index + 1) {
              return (
                <div
                  className="notification-item"
                  key={notification._id}
                  ref={lastNotificationRef}
                >
                  <NotificationItem notification={notification} />
                </div>
              );
            }

            return (
              <div className="notification-item" key={notification._id}>
                <NotificationItem
                  key={notification._id}
                  notification={notification}
                />
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Notification;
