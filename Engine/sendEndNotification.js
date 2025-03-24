const sendEndNotificationWeb = (title,body) => {
    Notification.requestPermission().then((result) => {
        console.log(result);
      });
      const notification = new Notification(title, { body: body });
}
export default sendEndNotificationWeb