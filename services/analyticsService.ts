import api from './api';

export const getAnalyticsData = async (): Promise<any> => {
  try {
    const response = await api.get('/admin-dashboard/analytics'); // Corrected endpoint
    return response.data;
  } catch (error) {
    throw error;
  }
};