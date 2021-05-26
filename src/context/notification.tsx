import React, { createContext, useState } from 'react';

interface NewNotificationsProps {
  setHasNewNotifications: React.Dispatch<React.SetStateAction<number>>;
  hasNewNotifications: number;
}

export const NewNotificationsContext = createContext<NewNotificationsProps>(
  null,
);

export const NewNotificationsProvider: React.FC = props => {
  const [hasNewNotifications, setHasNewNotifications] = useState(0);

  return (
    <NewNotificationsContext.Provider
      value={{ hasNewNotifications, setHasNewNotifications }}
      {...props}
    />
  );
};
