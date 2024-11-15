import React, { useEffect, useState } from 'react';
import { getAllNotifications, markNotificationAsRead } from '../services/notificationService';
import Card from '../components/Card/Card';
import './Notifications.css';
import Button from '../components/Button/Button';
import { toast } from 'react-toastify';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getAllNotifications();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      const updatedNotifications = notifications.map((notification) => {
        if (notification.id === id) {
          notification.status = 'READ';
        }
        toast.success('Notification marked as read successfully!',{
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        }); // Success toast
        return notification;
      });
      setNotifications(updatedNotifications);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }

  const renderNotification = (status) => {
    return notifications
      .filter((notification) => notification.status === status)
      .map((notification) => (
        <Card
          key={notification.id}
          title={notification.message}
          footer={notification.status==='UNREAD'?<Button text="Mark as Read" variant="secondary" onClick={() => handleMarkAsRead(notification.id)}/>:""}
          description={''}
        />
      ));
  };

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