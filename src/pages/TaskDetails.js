import React from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button/Button';
const TaskDetails = () => {
  const { id } = useParams();

  // Simulate fetching a task by ID
  const task = {
    id,
    title: `Task ${id}`,
    description: `Detailed description for Task ${id}`,
    status: 'Pending',
    deadline: '2024-11-15',
  };

  return (

    <div>
      <h2>Task Details</h2>
      <p>
        <strong>Title:</strong> {task.title}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      <p>
        <strong>Deadline:</strong> {task.deadline}
      </p>
      <Button text="Edit Task" variant="secondary" />
      <Button text="Delete Task" variant="danger" />
    </div>
  );
};

export default TaskDetails;