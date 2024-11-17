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
  const [desc, setDesc] = useState(false);
  useEffect(() => {
    document.title = 'Task Scheduler';
    const fetchTasks = async () => {
      try {
        const filters = { status, deadline, desc };
        const {data} = await getAllTasks(filters);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [status, deadline, desc]);

  const handleCreateTask = async (createdTask) => {
    setShowModal(false);
    setTasks((prevTasks) => [...prevTasks, createdTask]);
  };
  if (loading) return <Loader />;

  const renderTaskSection = (status) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
  
    if (filteredTasks.length === 0) return null; // Skip rendering if no tasks
  
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
      {/* Status Filter */}
      <p>Filter by Status:
        <select className='status' value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="OVERDUE">Overdue</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </p>
      <p>
        Filter by Deadline:
      {/* Deadline Filter */}
      <select value={deadline} onChange={(e) => setDeadline(e.target.value)}>
        <option value="">All Deadlines</option>
        <option value="TODAY">Today</option>
        <option value="TOMORROW">Tomorrow</option>
        <option value="THIS_WEEK">This Week</option>
      </select>
      </p>
      {/* Sorting Toggle */}
      <Button text={`Sort by Priority: ${desc ? 'High to Low' : 'Low to High'}`} variant="primary" onClick={() => setDesc((prev) => !prev)}/>
    </div>
        {tasks.length === 0 && <p className='No-Tasks'>No tasks found</p>}
        {['PENDING', 'OVERDUE', 'COMPLETED'].map(renderTaskSection)}
      <div>
        {showModal && <CreateTaskModal onClose={() => setShowModal(false)} onTaskCreated={handleCreateTask}/>}
      </div>
    </div>
  );
};

export default Dashboard;