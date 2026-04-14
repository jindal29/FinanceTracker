import axios from 'axios';

/**
 * Centralized Axios instance.
 * 
 * - baseURL is pulled from VITE_API_URL environment variable
 * - Content-Type is set to application/json by default
 * - Authorization header is attached automatically from localStorage
 * - Response interceptor handles 401 (expired token) globally
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle 401 globally (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only clear token if it exists (avoids clearing during login/register)
      const token = localStorage.getItem('token');
      if (token) {
        localStorage.removeItem('token');
        // Redirect to login if not already there
        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
