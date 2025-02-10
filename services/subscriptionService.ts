import api from './api';

export const createSubscription = async (subscriptionData: { bookId: string; plan: string; price: number; duration: number }): Promise<any> => {
  try {
    const response = await api.post('/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSubscription = async (bookId: string): Promise<any> => {
  try {
    const response = await api.get(`/subscriptions/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};