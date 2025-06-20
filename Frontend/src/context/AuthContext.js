import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTH_API } from '../api/apiEndpoints';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(AUTH_API.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error('Error fetching profile:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    }
  };

  useEffect(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(AUTH_API.LOGIN, { username, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      throw error.response?.data?.message || 'Invalid username or password';
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post(AUTH_API.SIGNUP, { username, password });
      console.log('Signup response:', response);
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response && error.response.status === 409) {
        throw new Error('User already exists');
      }
      throw error.response?.data?.message || 'Error during signup';
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};