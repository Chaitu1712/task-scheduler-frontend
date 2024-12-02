import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import { getTaskById, deleteTask, updateTaskStatus, updateTask } from '../services/taskService';
import './TaskDetails.css';
import { toast } from 'react-toastify';
import UpdateTaskModal from '../components/Modal/UpdateTaskModal';
import Loader from '../components/Loader/Loader';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    document.title = `Task ${id}`;
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false);
      }
    };
    if (!userId) {
      navigate('/login');
    } else {
      fetchTask();
    }
  }, [id, userId, navigate]);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast.success('Task deleted successfully!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateTaskStatus(task.id, newStatus);
      setStatus(newStatus);
      toast.success('Task status updated successfully!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleTaskUpdate = async (updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      setTask(updatedTask);
      setShowModal(false);
      toast.success('Task updated successfully!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className='card'>
        <h2>Task Details</h2>
        <div className='card-header'><h3>{task.title}</h3></div>
        <div className='card-body'><p>{task.description}</p></div>
        <div className='footer'>
          <div className='status'>
            <p>ID: {task.id}</p>
            <p>Status:
              <select value={status} onChange={(e) => handleStatusUpdate(e.target.value)}>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="OVERDUE" disabled>Overdue</option>
              </select>
            </p>
            <p>Deadline:{task.deadline}</p>
            <p>Priority:{task.priority}</p>
          </div>
          <div className='card-footer'>
            <Button text="Edit Task" variant="secondary" onClick={() => setShowModal(true)} />
            <Button text="Delete Task" variant="danger" onClick={handleDelete} />
          </div>
        </div>
      </div>
      {showModal && (<UpdateTaskModal task={task} onClose={() => setShowModal(false)} onUpdate={handleTaskUpdate} />)}
    </div>
  );
};

export default TaskDetails;