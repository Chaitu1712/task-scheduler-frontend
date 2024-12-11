'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, notFound } from 'next/navigation';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';
import UpdateTaskModal from '../../components/Modal/UpdateTaskModal';
import { getTaskById, deleteTask, updateTaskStatus, updateTask } from '../../services/taskService';
import { toast } from 'react-toastify';
import styles from './TaskDetail.module.css';

const TaskDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) return;
      try {
        const data = await getTaskById(id);
        setTask(data);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching task:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
    } else {
      fetchTask();
    }
  }, [id, router]);

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
      router.push('/dashboard');
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Error deleting task. Please try again.', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
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

  if (!id || loading) return <Loader />;
  if (!task) return null;

  return (
    <div>
      <div className={styles.card}>
        <h2>Task Details</h2>
        <div className={styles.cardHeader}><h3>{task.title}</h3></div>
        <div className={styles.cardBody}><p>{task.description}</p></div>
        <div className={styles.footer}>
          <div className={styles.status}>
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
          <div className={styles.cardFooter}>
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