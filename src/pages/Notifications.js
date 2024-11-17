import React, { useEffect } from 'react';
import { useNotifications } from '../NotificationProvider'; // Use the NotificationProvider
import Card from '../components/Card/Card';
import './Notifications.css';
import Button from '../components/Button/Button';
import { toast } from 'react-toastify';
import Loader from '../components/Loader/Loader';
import { markNotificationAsRead } from '../services/notificationService';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications(); // Access global notifications and fetch logic
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    document.title = 'Notifications';
    setLoading(false); // Assume notifications are already fetched by the provider
  }, []);


  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id); // Call the API to mark as read
      markAsRead(id); // Refresh the context state
      toast.success('Notification marked as read successfully!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const renderNotification = (status) => {
    return notifications
      .filter((notification) => notification.status === status)
      .map((notification) => (
        <Card
          key={notification.id}
          title={notification.message}
          footer={
            notification.status === 'UNREAD' ? (
              <Button
                text="Mark as Read"
                variant="secondary"
                onClick={() => handleMarkAsRead(notification.id)}
              />
            ) : (
              ''
            )
          }
          description={''}
        />
      ));
  };

  if (loading) return <Loader />;
  return (
    <div>
      <h2>Notifications</h2>
      <h3>Unread</h3>
      {renderNotification('UNREAD')}
      <h3>Read</h3>
      {renderNotification('READ')}
    </div>
  );
};

export default Notifications;