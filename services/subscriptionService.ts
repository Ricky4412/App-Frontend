import api from './api';

export const initializePayment = async (paymentData: { email: string; amount: number; mobileNumber: string; serviceProvider: string; accountName: string }): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions/pay', paymentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
