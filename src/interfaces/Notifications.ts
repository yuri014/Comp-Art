export interface INotification {
  _id: string;
  from: string;
  body: string;
  read: boolean;
  createdAt: string;
  link: string;
  avatar: string;
}

export interface NotificationQuery {
  getNotifications: INotification[];
}

export interface NotificationSubscription {
  notification: INotification;
}
