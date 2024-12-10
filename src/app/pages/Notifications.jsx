'use client';
import React, { useEffect, useState } from 'react';
import { useNotifications } from '../NotificationProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-toastify';
import styles from './Notifications.module.css';
import {markNotificationAsRead} from '../services/notificationService';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    document.title = 'Notifications';
    if (!userId) {
      navigate('/login');
    } else {
      setLoading(false); // Assume notifications are already fetched by the provider
    }
  }, [userId, navigate]);

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
  if (loading) return <div>Loading...</div>;
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