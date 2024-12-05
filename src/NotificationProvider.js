import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; // Make sure you have installed react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import { getAllNotifications } from './services/notificationService'; // Replace with your service path
import { useLocation } from 'react-router-dom';

// Create Context
const NotificationContext = createContext();

// Custom Hook for easy consumption of context
export const useNotifications = () => useContext(NotificationContext);

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [pollingRate, setPollingRate] = useState(60000); // Default polling rate of 60 seconds
  const location = useLocation();

  const fetchNotifications = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    try {
      const data = await getAllNotifications(userId);
      setNotifications(data);
      // Filter new notifications
      const newNotifs = data.filter(
        (notif) => !notifications.some((existing) => existing.id === notif.id)
      );

      if (newNotifs.length > 0) {
        setNotifications((prev) => [...newNotifs, ...prev]);
        setNewNotifications(newNotifs);

        // Show toast for each new notification if not on login or register page
        if (location.pathname !== '/login' && location.pathname !== '/register') {
          newNotifs.filter((notif) => notif.status === 'UNREAD').forEach((notif) => {
            toast.info(`🔔 ${notif.message}`, { autoClose: 3000, theme: 'colored', closeOnClick: true,
              pauseOnHover: true,
              draggable: true});
          });
        }
        setPollingRate(20000); // Increase polling rate to 20 seconds if new notifications are found
      } else {
        setPollingRate(60000); // Reset polling rate to 60 seconds if no new notifications
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, [location.pathname, notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'READ' } : notif
      )
    );
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(() => fetchNotifications(), pollingRate);
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [pollingRate, fetchNotifications]); // Re-run effect when pollingRate or fetchNotifications changes

  return (
    <NotificationContext.Provider value={{
      notifications,
      newNotifications,
      fetchNotifications,
      markAsRead, // Expose markAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};