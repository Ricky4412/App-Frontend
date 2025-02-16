import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the API base URL for your deployed backend
const API_BASE_URL = 'https://n-app.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Adds Authorization Token to Headers
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles Errors & Logs Responses
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API call error:', error);
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);

      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - invalid token or session expired');
          break;
        case 403:
          console.error('Forbidden - insufficient permissions');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error - try again later');
          break;
        default:
          console.error('Unexpected error occurred');
      }
    } else if (error.request) {
      console.error('No response received from server:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
