import api from './api';

// Get all tasks with optional filters
export const getAllTasks = (filters = {}) => {
  const userId = localStorage.getItem('userId');
  const { status, deadline } = filters;
  let query = '?';
  if (status) query += `status=${status}&`;
  if (deadline) query += `deadline=${deadline}&`;
  return api.get(`/tasks/${userId}${query}`);
};

export const getTaskById = async (id) => {
  try {
    const userId = localStorage.getItem('userId');
    const response = await api.get(`/tasks/${userId}/${id}`);
    if (!response.data) {
      throw new Error('Task not found');
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch task');
  }
};

export const createTask = async (taskData) => {
  const userId = localStorage.getItem('userId');
  const response = await api.post(`/tasks/${userId}`, taskData);
  return response.data;
};

export const updateTask = async (id, updatedData) => {
  const userId = localStorage.getItem('userId');
  const response = await api.put(`/tasks/${userId}/${id}`, updatedData);
  return response.data;
};

export const deleteTask = async (id) => {
  const userId = localStorage.getItem('userId');
  const response = await api.delete(`/tasks/${userId}/${id}`);
  return response.data;
};

// Additional functionality (e.g., mark task as complete)
export const markTaskAsComplete = async (id) => {
  const userId = localStorage.getItem('userId');
  const response = await api.patch(`/tasks/${userId}/${id}/complete`);
  return response.data;
};

export const updateTaskStatus = async (id, status) => {
  const userId = localStorage.getItem('userId');
  const response = await api.patch(`/tasks/${userId}/${id}/status`, { status });
  return response.data;
};