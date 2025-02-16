import api from './api';

export const createSubscription = async (subscriptionData: { bookId: string; plan: string; price: number; duration: number; mobileNumber: string; serviceProvider: string; accountName: string }): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getUserSubscription = async (subscriptionId: string): Promise<any> => {
  try {
    const response = await api.get(`/api/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const initializePayment = async (paymentData: { email: string; amount: number; mobileNumber: string; serviceProvider: string; accountName: string }): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions/pay', paymentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
