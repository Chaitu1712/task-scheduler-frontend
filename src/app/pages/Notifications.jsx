import React, { useEffect, useState } from 'react';
import { useNotifications } from '../NotificationProvider';
import { useRouter } from 'next/router';
import toast from 'react-toastify';
import styles from './Notifications.module.css';

const Notifications = () => {
  const { notifications, fetchNotifications, markAsRead } = useNotifications();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    setLoading(false);
  }, [fetchNotifications]);

  const handleMarkAsRead = async (id) => {
    await markAsRead(id);
    toast.success('Notification marked as read!', { position: 'bottom-right' });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.notificationsContainer}>
      <h2 className={styles.title}>Notifications</h2>
      {notifications.map(notification => (
        <div key={notification.id} className={styles.notification}>
          <p className={styles.message}>{notification.message}</p>
          <button
            className={styles.button}
            onClick={() => handleMarkAsRead(notification.id)}
          >
            Mark as Read
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notifications;