import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import Button from '../components/Button/Button';
import Card from '../components/Card/Card';
import Loader from '../components/Loader/Loader';
import UpdateTaskModal from '../components/Modal/UpdateTaskModal';
import { getTaskById, deleteTask, updateTaskStatus, updateTask } from '../services/taskService';
import { toast } from 'react-toastify';
import styles from './TaskDetails.module.css';

const TaskDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
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
      router.push('/login');
    } else {
      fetchTask();
    }
  }, [id, userId, router]);

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

  if (loading) return <Loader />;

  return (
    <div>
      <div className={styles.taskDetailsContainer}>
        <h2>Task Details</h2>
        <Card
          title={task.title}
          description={task.description}
          priority={task.priority}
          deadline={task.deadline}
          status={task.status}
          footer={
            <Button
              text="View Details"
              variant="primary"
              onClick={() => router.push(`/tasks/${task.id}`)}
            />
          }
        />
        <div className={styles.actions}>
          <Button
            text="Edit Task"
            variant="secondary"
            onClick={() => setShowModal(true)}
          />
          <Button
            text="Delete Task"
            variant="danger"
            onClick={handleDelete}
          />
        </div>
        {showModal && (
          <UpdateTaskModal
            task={task}
            onClose={() => setShowModal(false)}
            onUpdate={handleTaskUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default TaskDetails;