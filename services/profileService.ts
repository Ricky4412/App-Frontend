import api from './api';

// Define types for the user profile and activity log
interface UserProfile {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  profilePicture?: string;
  role: string;
  subscription?: string;
  isVerified: boolean;
}

interface Activity {
  _id: string;
  user: string;
  action: string;
  timestamp: string;
}

// Function to get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    // Ensure the endpoint matches the backend route
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to update user profile
export const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<UserProfile> => {
  try {
    // Ensure the endpoint matches the backend route
    const response = await api.put('/users/profile', profileData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to change user password
export const changePassword = async (newPassword: string): Promise<void> => {
  try {
    // Ensure the endpoint matches the backend route
    await api.put('/users/profile/password', { newPassword });
  } catch (error) {
    console.error('Error changing password:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Function to get user activity log
export const getActivityLog = async (): Promise<Activity[]> => {
  try {
    // Ensure the endpoint matches the backend route
    const response = await api.get('/users/activity-log');
    return response.data;
  } catch (error) {
    console.error('Error fetching activity log:', error.response ? error.response.data : error.message);
    throw error;
  }
};