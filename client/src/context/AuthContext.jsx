import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:5001/api/v1';

  // Check valid token on load
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get('/auth/me');
          setUser(res.data.data);
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const setToken = (token) => {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await axios.post('/auth/login', { email, password });
      setToken(res.data.data.token);
      setUser(res.data.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return false;
    }
  };

  const register = async (name, email, password) => {
    setError(null);
    try {
      const res = await axios.post('/auth/register', { name, email, password });
      setToken(res.data.data.token);
      setUser(res.data.data);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
