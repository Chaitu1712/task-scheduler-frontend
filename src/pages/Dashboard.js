import React, { useState, useEffect } from 'react';
import Card from '../components/Card/Card';
import Button from '../components/Button/Button';
import { getAllTasks } from '../services/taskService';
import { useNavigate } from 'react-router-dom';
import CreateTaskModal from '../components/Modal/CreateTaskModal';
import Loader from '../components/Loader/Loader';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [deadline, setDeadline] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    document.title = 'Task Scheduler';
    const fetchTasks = async () => {
      try {
        // Create a filter object only with non-empty values
        const filters = {};
        if (status) filters.status = status;
        if (deadline) filters.deadline = deadline;

        const { data } = await getAllTasks(filters);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!userId) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [status, deadline, userId, navigate]);

  const handleCreateTask = async (createdTask) => {
    setShowModal(false);
    setTasks((prevTasks) => [...prevTasks, createdTask]);
  };

  if (loading) return <Loader />;

  const renderTaskSection = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);

    if (filteredTasks.length === 0) return null;

    return (
      <div key={status}>
        <h3>{status.charAt(0) + status.slice(1).toLowerCase()} Tasks</h3>
        <div className="task-grid">
          {filteredTasks.map((task) => (
            <Card
              key={task.id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              deadline={task.deadline}
              status={task.status}
              footer={
                <Button
                  text="View Details"
                  variant="primary"
                  onClick={() => navigate(`/tasks/${task.id}`)}
                />
              }
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="filter-controls">
        <Button text="Create New Task" variant="primary" onClick={() => setShowModal(true)} />
        <div></div>
        <p>Filter by Status:
          <select className='status' value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="OVERDUE">Overdue</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </p>
        <p>Filter by Deadline:
          <select value={deadline} onChange={(e) => setDeadline(e.target.value)}>
            <option value="">All</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="this_week">This Week</option>
            <option value="next_week">Next Week</option>
          </select>
        </p>
      </div>
      {tasks.length === 0 && <p className='No-Tasks'>No tasks found</p>}
      {['PENDING', 'OVERDUE', 'COMPLETED'].map(renderTaskSection)}
      <div>
        {showModal && <CreateTaskModal onClose={() => setShowModal(false)} onTaskCreated={handleCreateTask} />}
      </div>
    </div>
  );
};

export default Dashboard;