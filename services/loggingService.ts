import api from './api';

export const logAction = async (action: string): Promise<any> => {
  try {
    const response = await api.post('/api/activity-log', { action });
    return response.data;
  } catch (error) {
    throw error;
  }
};