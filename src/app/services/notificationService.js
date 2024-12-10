import api from './api';

export const getAllNotifications = async () => {
  const userId = localStorage.getItem('userId');
  const response = await api.get(`/notifications/${userId}`);
  return response.data;
};

export const markNotificationAsRead = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};