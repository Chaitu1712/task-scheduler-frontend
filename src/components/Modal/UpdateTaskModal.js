import React, { useState } from 'react';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import './Modal.css';
const UpdateTaskModal = ({ task, onClose, onUpdate }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [deadline, setDeadline] = useState(task.deadline);
    const [priority, setPriority] = useState(task.priority);
  
    const handleUpdate = () => {
      const updatedTask = {
        title,
        description,
        deadline,
        priority,
      };
      onUpdate(updatedTask);
    };
  
    return (
      <div className="modal">
        <div className="modal-content">
          <h2>Update Task</h2>
          <InputField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <InputField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <InputField label="Deadline" type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <InputField label="Priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
          <div className="modal-actions">
            <Button text="Update Task" variant="primary" onClick={handleUpdate} />
            <Button text="Cancel" variant="secondary" onClick={onClose} />
          </div>
        </div>
      </div>
    );
};  
export default UpdateTaskModal;