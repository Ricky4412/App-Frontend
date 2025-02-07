import api from './api';

// Send OTP to user's email
export const sendOtp = async (email: string): Promise<any> => {
  try {
    const response = await api.post('/api/auth/send-otp', { email });
    return response.data;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

// Verify OTP
export const verifyOtp = async (userId: string, otp: string): Promise<any> => {
  try {
    const response = await api.post('/api/auth/verify-otp', { userId, otp });
    return response.data;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Register a new user
export const register = async (name: string, email: string, telephone: string, password: string): Promise<any> => {
  try {
    const response = await api.post('/api/auth/register', { name, email, telephone, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const login = async (email: string, password: string): Promise<any> => {
  try {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Get user role
export const getUserRole = async (userId: string): Promise<string> => {
  try {
    const response = await api.get(`/api/auth/user-role/${userId}`);
    return response.data.role;
  } catch (error) {
    console.error('Error getting user role:', error);
    throw error;
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<any> => {
  try {
    const response = await api.post('/api/auth/request-reset', { email });
    return response.data;
  } catch (error) {
    console.error('Error requesting password reset:', error);
    throw error;
  }
};

// Reset user password
export const resetPassword = async (userId: string, otp: string, password: string, confirmPassword: string): Promise<any> => {
  try {
    const response = await api.post('/api/auth/reset-password', { userId, otp, password, confirmPassword });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
