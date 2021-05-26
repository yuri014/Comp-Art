interface Options {
  title: string;
  body: string;
  link: string;
}

const sendNotification = (
  options: Options,
  callback: (url: string) => Promise<boolean>,
): void => {
  const { body, link, title } = options;

  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      vibrate: [200, 100, 200],
    });

    notification.onclick = e => {
      e.preventDefault();
      callback(link);
      window.focus();
      notification.close();
    };
  }
};

export default sendNotification;
