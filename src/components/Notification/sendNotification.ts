const sendNotification = (title: string, body: string, link: string): void => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body,
      vibrate: [200, 100, 200],
    });

    notification.onclick = e => {
      e.preventDefault();
      window.focus();
      notification.close();
    };
  }
};

export default sendNotification;
