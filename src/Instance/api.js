import axios from 'axios';

// Create an instance of Axios
const apiInstance = axios.create({
  baseURL: 'http://18.237.111.97:9000/api', // Replace with your API base URL
  timeout: 10000, // Set a timeout for requests (optional)
  headers: {
    'Content-Type': 'application/json', // Default headers (optional)
    // Add more headers if needed, e.g., Authorization
  },
});

// Optional: Add a request interceptor
apiInstance.interceptors.request.use(
  config => {
    // You can modify the request before it is sent, for example, to add an authorization token
    // config.headers.Authorization = Bearer ${yourToken};
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