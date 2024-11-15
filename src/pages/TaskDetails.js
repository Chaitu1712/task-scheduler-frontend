import React from 'react';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams(); // Extract task ID from the URL
  return <h1>Task Details Page for Task ID: {id}</h1>;
};

export default TaskDetails;