import React from 'react';
import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core';
import { FaBell } from 'react-icons/fa';
import { useSubscription } from '@apollo/client';
import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { NOTIFICATIONS_SUBSCRIPTION } from '@graphql/subscriptions/notifications';
import Link from 'next/link';
import NotificationContainer from './styles';

interface NotificationProps {
  notification: {
    _id: string;
    from: string;
    body: string;
    read: boolean;
    createdAt: string;
    link: string;
    avatar: string;
  };
}

const Notification: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { data, loading } = useSubscription<NotificationProps>(
    NOTIFICATIONS_SUBSCRIPTION,
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        >
          <MenuItem>
            <NotificationContainer>
              <Link href={`/profile/${data.notification.link}`}>
                <a>
                  <img
                    src={
                      process.env.NEXT_PUBLIC_API_HOST +
                      data.notification.avatar
                    }
                    alt="Teste"
                  />
                  <div>
                    <div className="head">
                      <strong>{data.notification.from}</strong>
                      <p>&nbsp;{data.notification.body}</p>
                    </div>
                    <span>
                      {formatDistance(
                        new Date(),
                        new Date(data.notification.createdAt),
                        {
                          locale: ptBR,
                          addSuffix: true,
                        },
                      )}
                    </span>
                  </div>
                  {!data.notification.read && <div className="new" />}
                </a>
              </Link>
            </NotificationContainer>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default Notification;
