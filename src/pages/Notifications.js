import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // Simulate fetching notifications from the backend
  useEffect(() => {
    // Example notification data
    const exampleNotifications = [
      { id: 1, message: 'Task 1 is overdue.', type: 'Overdue' },
      { id: 2, message: 'Task 2 was rescheduled to a new date.', type: 'Rescheduled' },
    ];
    setNotifications(exampleNotifications);
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          title={notification.type}
          description={notification.message}
        />
      ))}
    </div>
  );
};

export default Notifications;