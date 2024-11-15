import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button/Button';
import { getTaskById, deleteTask, updateTaskStatus } from '../services/taskService';
import './TaskDetails.css'
import { toast } from 'react-toastify';

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState(''); // Initialize as an empty string

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const data = await getTaskById(id);
        setTask(data);
        setStatus(data.status); // Set the status after task is fetched
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      toast.success('Task deleted successfully!',{
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      }); // Success toast
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateTaskStatus(task.id, newStatus);
      setStatus(newStatus);
      toast.success('Task status updated successfully!',{
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      }); // Success toast
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!task){
      return <p>Loading...</p>;

    }

  return (
    <div className='card'>
      <h2>Task Details</h2>
      <div className='card-header'><h3>{task.title}</h3></div>
      <div className='card-body'><p>{task.description}</p></div>
      <div className='footer'>
        <div className='status'>
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
          <Button text="Edit Task" variant="secondary" />
          <Button text="Delete Task" variant="danger" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;