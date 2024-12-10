import api from './api';

export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const loginUser = async (loginData) => {
  const response = await api.post('/users/login', loginData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post('/users/logout');
  return response.data;
};