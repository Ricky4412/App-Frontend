import api from './api';

interface ApiResponse {
  data: any;
}

interface ErrorResponse {
  message: string;
}

// Send OTP to user's email
export const sendOtp = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/auth/send-otp', { email });
    return response.data;
  } catch (error: any) {
    console.error('Error sending OTP:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error sending OTP');
  }
};

// Verify OTP
export const verifyOtp = async (userId: string, otp: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/auth/verify-otp', { userId, otp });
    return response.data;
  } catch (error: any) {
    console.error('Error verifying OTP:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error verifying OTP');
  }
};

// Register a new user
export const register = async (name: string, email: string, telephone: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/auth/register', { name, email, telephone, password });
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error registering user');
  }
};

// Login user
export const login = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    console.error('Error logging in:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};

// Get user role
export const getUserRole = async (userId: string): Promise<string> => {
  try {
    const response = await api.get<ApiResponse>(`/api/auth/user-role/${userId}`);
    return response.data.role;
  } catch (error: any) {
    console.error('Error getting user role:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error getting user role');
  }
};

// Request password reset
export const requestPasswordReset = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/auth/request-reset', { email });
    return response.data;
  } catch (error: any) {
    console.error('Error requesting password reset:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error requesting password reset');
  }
};

// Reset user password
export const resetPassword = async (userId: string, otp: string, password: string, confirmPassword: string): Promise<ApiResponse> => {
  try {
    const response = await api.post<ApiResponse>('/api/auth/reset-password', { userId, otp, password, confirmPassword });
    return response.data;
  } catch (error: any) {
    console.error('Error resetting password:', error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || 'Error resetting password');
  }
};
