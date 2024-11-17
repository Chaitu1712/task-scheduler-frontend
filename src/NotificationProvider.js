import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // Make sure you have installed react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import { getAllNotifications } from './services/notificationService'; // Replace with your service path

// Create Context
const NotificationContext = createContext();

// Custom Hook for easy consumption of context
export const useNotifications = () => useContext(NotificationContext);

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
          const data = await getAllNotifications();
          setNotifications(data);
        // Filter new notifications
        const newNotifs = data.filter(
          (notif) => !notifications.some((existing) => existing.id === notif.id)
        );

        if (newNotifs.length > 0) {
          setNotifications((prev) => [...newNotifs, ...prev]);
          setNewNotifications(newNotifs);

          // Show toast for each new notification
          newNotifs.filter((notif) => notif.status === 'UNREAD').forEach((notif) => {
            toast.info(`🔔 ${notif.message}`, { autoClose: 3000, theme: 'colored', closeOnClick: true,
              pauseOnHover: true,
              draggable: true});
          });
        }
      else ;
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: 'READ' } : notif
      )
    );
  };

  useEffect(() => {
    // Initial fetch and polling setup
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 60000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  });

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