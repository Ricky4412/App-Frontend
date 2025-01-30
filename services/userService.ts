import api from './api';

export const getUserProfile = async (): Promise<any> => {
  try {
    const response = await api.get('/api/users/profile');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getActivityLog = async (): Promise<any> => {
  try {
    const response = await api.get('/api/users/activity-log');
    return response.data;
  } catch (error) {
    throw error;
  }
};
