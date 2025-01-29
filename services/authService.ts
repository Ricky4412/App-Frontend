// authService.ts
import api from './api';

export const sendOtp = async (email: string): Promise<any> => {
  try {
    const response = await api.post('/auth/send-otp', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (userId: string, otp: string): Promise<any> => {
  try {
    const response = await api.post('/auth/verify-otp', { userId, otp });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (name: string, email: string, telephone: string, password: string): Promise<any> => {
  try {
    const response = await api.post('/auth/register', { name, email, telephone, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Define getUserRole function
export const getUserRole = async (userId: string): Promise<string> => {
  try {
    const response = await api.get(`/auth/user-role/${userId}`);
    return response.data.role;
  } catch (error) {
    throw error;
  }
};
