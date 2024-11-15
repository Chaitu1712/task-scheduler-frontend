import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  // Simulate fetching tasks from the backend
  useEffect(() => {
    // Example task data
    const exampleTasks = [
      { id: 1, title: 'Task 1', description: 'Description 1', status: 'Pending' },
      { id: 2, title: 'Task 2', description: 'Description 2', status: 'Overdue' },
      { id: 3, title: 'Task 3', description: 'Description 3', status: 'Completed' },
    ];
    setTasks(exampleTasks);
  }, []);

  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Card
          key={task.id}
          title={task.title}
          description={task.description}
          footer={<Button text="View Details" variant="primary" />}
        />
      ));
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <Button text="Create New Task" variant="primary" />
      <h3>Pending Tasks</h3>
      {renderTasks('Pending')}
      <h3>Overdue Tasks</h3>
      {renderTasks('Overdue')}
      <h3>Completed Tasks</h3>
      {renderTasks('Completed')}
    </div>
  );
};

export default Dashboard;