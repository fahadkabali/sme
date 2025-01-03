import NotificationSender from '../../components/notifications/NotificationSender';

const NotificationsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage Notifications</h1>
      <NotificationSender />
    </div>
  );
};

export default NotificationsPage;
