import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create an instance of Axios
const apiInstance = axios.create({
  baseURL: 'http://18.237.111.97:9000/api', // Replace with your API base URL
  timeout: 10000, // Timeout after 10 seconds
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
apiInstance.interceptors.request.use(
  async config => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        // Set the Authorization header if the token exists
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error retrieving token", error);
    }
    return config;
  },
  error => {
    // Handle the error
    return Promise.reject(error);
  }
);

// Optional: Add a response interceptor
apiInstance.interceptors.response.use(
  response => {
    // Handle the response data
    return response;
  },
  error => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default apiInstance;
