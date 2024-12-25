'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import { useNotifications } from '../NotificationProvider';
import { useRouter } from 'next/navigation';
import styles from './Notifications.module.css';
import {markNotificationAsRead} from '../services/notificationService';
import Loader from '../components/Loader/Loader';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const Notifications = () => {
  const { notifications, markAsRead } = useNotifications();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    document.title = 'Notifications';
    const storedUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
    setUserId(storedUserId);
    
    if (!storedUserId) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleMarkAsRead = useCallback(async (id) => {
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
  }, [markAsRead]);

  const renderNotification = useCallback((status) => {
    const seenIds = new Set();
    return notifications
      .filter((notification) => {
        if (notification.status === status && !seenIds.has(notification.id)) {
          seenIds.add(notification.id);
          return true;
        }
        return false;
      })
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
  }, [notifications, handleMarkAsRead]);

  if (loading) return <Loader />;
  return (
    <div>
      <h2 className={styles.h2}>Notifications</h2>
      <h3 className={styles.h3}>Unread</h3>
      {renderNotification('UNREAD')}
      <h3 className={styles.h3}>Read</h3>
      {renderNotification('READ')}
    </div>
  );
};

export default Notifications;