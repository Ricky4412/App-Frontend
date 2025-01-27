import api from './api';

export const subscribe = async (planId: string): Promise<any> => {
  try {
    const response = await api.post('/subscriptions', { planId });
    return response.data;
  } catch (error) {
    throw error;
  }
};