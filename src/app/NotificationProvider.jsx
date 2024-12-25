'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify'; // Make sure you have installed react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Toastify styles
import { getAllNotifications } from './services/notificationService'; // Replace with your service path
import { usePathname } from 'next/navigation';
import { logger } from './utils/logger';

// Create Context
const NotificationContext = createContext();

// Custom Hook for easy consumption of context
export const useNotifications = () => useContext(NotificationContext);

// Notification Provider Component
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [pollingRate, setPollingRate] = useState(60000); // Default polling rate of 60 seconds
  const pathname = usePathname();  // Updated from router.pathname

  const fetchNotifications = useCallback(async () => {
    const userId = localStorage.getItem('userId');
    try {
      const data = await getAllNotifications(userId);
      setNotifications(prevNotifications => {
        // Filter new notifications using prevNotifications instead
        const newNotifs = data.filter(
          (notif) => !prevNotifications.some((existing) => existing.id === notif.id)
        );
        if (newNotifs.length > 0) {
          setNewNotifications(newNotifs);
          return [...newNotifs, ...prevNotifications];
        }
        return prevNotifications;
      });
    } catch (error) {
      logger.error('Failed to fetch notifications:', error);
    }
  }, []); // Remove notifications from dependencies

  useEffect(() => {
    const interval = setInterval(fetchNotifications, pollingRate);
    return () => clearInterval(interval);
  }, [fetchNotifications, pollingRate]);

  useEffect(() => {
    fetchNotifications();
  }, [pathname]);  // Updated dependency

  return (
    <NotificationContext.Provider value={{ notifications, newNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};