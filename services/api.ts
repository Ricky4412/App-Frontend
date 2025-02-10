import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the API base URL for your deployed proxy server
const API_BASE_URL = 'https://n-app.onrender.com';
REACT_APP_PROXY_SERVER_URL='https://proxy-server-puce-alpha.vercel.app'
const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add authorization token to headers
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
        config.params = config.params || {};
        config.params['url'] = `${process.env.REACT_APP_BACKEND_URL}${config.url}`;
        config.url = '';
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

// Response interceptor for logging and error handling
api.interceptors.response.use(
  (response) => {
    // Log the response for debugging purposes
    console.log('API response:', response);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API call error:', error);
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);

      // Handle specific status codes if needed
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access - possibly invalid token');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Internal server error');
          break;
        default:
          console.error('An unexpected error occurred');
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
