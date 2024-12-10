import React, { useState } from 'react';
import { createTask } from '../../services/taskService';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import styles from './CreateTaskModal.module.css';
import { toast } from 'react-toastify';

const CreateTaskModal = ({ onClose, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');

  const handleCreateTask = async () => {
    try {
      if (priority < 1 || priority > 10) {
        toast.error("Priority must be an integer between 1 and 10.", {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        return;
      }
      const newTask = { title, description, deadline, priority };
      const createdTask = await createTask(newTask);
      toast.success('Task created successfully!', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      onTaskCreated(createdTask); // Update the parent with the new task
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Create New Task</h2>
        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          label="Deadline"
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <InputField
          label="Priority"
          type="number"
          min={1}
          max={10}
          step={1}
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value, 10))}
        />
        <div className={styles.modalActions}>
          <Button
            text="Create Task"
            variant="primary"
            onClick={handleCreateTask}
          />
          <Button
            text="Cancel"
            variant="secondary"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;