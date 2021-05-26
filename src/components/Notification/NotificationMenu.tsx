import React, { useRef } from 'react';

import useInfiniteScroll from '@hooks/infiniteScroll';
import { NotificationQuery } from '@interfaces/Notifications';
import useOutsideClick from '@hooks/outsideClick';
import { NotificationMenuContainer } from './styles';
import NotificationItem from './NotificationItem';

interface NotificationMenuProps {
  data: NotificationQuery;
  fetchMore: ({
    variables: { offset: number },
  }) => Promise<{ data: NotificationQuery }>;
  loading: boolean;
  openMenu: boolean;
  setOpenMenu: (value: React.SetStateAction<boolean>) => void;
  refetch: () => void;
}

const NotificationMenu: React.FC<NotificationMenuProps> = ({
  data,
  loading,
  openMenu,
  fetchMore,
  setOpenMenu,
  refetch,
}) => {
  const lastNotificationRef = useInfiniteScroll(data, async () => {
    if (data.getNotifications.length === 4) {
      const newPosts = await fetchMore({
        variables: { offset: data.getNotifications.length + 1 },
      });
      return newPosts.data.getNotifications.length === 4;
    }

    return false;
  });

  const notificationMenuRef = useRef(null);
  useOutsideClick(notificationMenuRef, () => {
    setOpenMenu(false);
    refetch();
  });

  return (
    <>
      {!loading && data && openMenu && (
        <NotificationMenuContainer ref={notificationMenuRef}>
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
        </NotificationMenuContainer>
      )}
    </>
  );
};

export default NotificationMenu;
