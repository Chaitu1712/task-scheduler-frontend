
import api from './api';

// Get all tasks with optional filters and sorting
export const getAllTasks = (filters = {}) => {
  const { status, deadline, desc } = filters;
  let query = '?';
  if (status) query += `status=${status}&`;
  if (deadline) query += `deadline=${deadline}&`;
  if (desc !== undefined) query += `desc=${desc}&`;
  return api.get(`/tasks${query}`);
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

export const updateTaskStatus = async (id, status) => {
  const response = await api.patch(`/tasks/${id}/status`, { status });
  return response.data;
}