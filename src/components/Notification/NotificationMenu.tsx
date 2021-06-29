import React, { useRef, useState } from 'react';
import { Badge, IconButton } from '@material-ui/core';
import { FaBell } from 'react-icons/fa';

import useNotifications from '@hooks/useNotifications';
import useOutsideClick from '@hooks/outsideClick';
import Notification from '.';
import { NotificationMenuContainer } from './styles';

const NotificationMenu: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const notificationMenuRef = useRef(null);

  const { data, fetchMore, hasNewNotifications, loading } = useNotifications();

  useOutsideClick(notificationMenuRef, () => {
    setOpenMenu(false);
  });

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
      {openMenu && (
        <NotificationMenuContainer ref={notificationMenuRef}>
          <Notification
            data={data}
            fetchMore={fetchMore}
            loading={loading}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          />
        </NotificationMenuContainer>
      )}
    </>
  );
};

export default React.memo(NotificationMenu);
