import api from './api';

export const createSubscription = async (subscriptionData: { bookId: string; plan: string; price: number; duration: number; mobileNumber: string; serviceProvider: string; accountName: string }): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserSubscriptionByBook = async (bookId: string): Promise<any> => {
  try {
    const response = await api.get(`/api/subscriptions/book/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const initializePayment = async (paymentData: { email: string; amount: number; mobileNumber: string; serviceProvider: string; accountName: string; bookId: string; plan: string; duration: number }): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions/pay', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyPayment = async (paymentData: { reference: string }): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions/verify', paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
