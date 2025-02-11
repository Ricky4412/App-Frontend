import api from './api';

export const makePayment = async (email: string, phoneNumber: string, amount: number, currency: string): Promise<any> => {
  try {
    const response = await api.post('/pay', { email, phoneNumber, amount, currency });
    return response.data;
  } catch (error) {
    throw error;
  }
};
