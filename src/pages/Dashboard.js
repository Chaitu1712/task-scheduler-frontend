import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { getAllTasks } from '../services/taskService';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  const openTask = (id) => {
    navigate(`/task/${id}`);
  }
  const renderTasks = (status) => {
    return tasks
      .filter((task) => task.status === status)
      .map((task) => (
        <Card
          key={task.id}
          title={task.title}
          description={task.description}
          priority={task.priority}
          footer={<Button text="View Details" variant="primary"  onClick={() => navigate(`/tasks/${task.id}`)} />}
        />
      ));
  };

  return (
    <div>
      <Button text="Create New Task" variant="primary" />
      <h3>Pending Tasks</h3>
      {renderTasks('PENDING')}
      <h3>Overdue Tasks</h3>
      {renderTasks('OVERDUE')}
      <h3>Completed Tasks</h3>
      {renderTasks('COMPLETED')}
    </div>
  );
};

export default Dashboard;