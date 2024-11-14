
import api from './api';

export const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, updatedData) => {
  const response = await api.put(`/tasks/${id}`, updatedData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await api.delete(`/tasks/${id}`);
  return response.data;
};

// Additional functionality (e.g., mark task as complete)
export const markTaskAsComplete = async (id) => {
  const response = await api.patch(`/tasks/${id}/complete`);
  return response.data;
};