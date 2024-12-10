import React, { useState } from 'react';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import styles from './UpdateTaskModal.module.css';
import { toast } from 'react-toastify';

const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.deadline);
  const [priority, setPriority] = useState(task.priority);

  const handleUpdate = () => {
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
    const updatedTask = {
      id: task.id,
      title,
      description,
      deadline,
      priority,
    };
    onUpdate(updatedTask);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Update Task</h2>
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
            text="Update Task"
            variant="primary"
            onClick={handleUpdate}
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

export default UpdateTaskModal;