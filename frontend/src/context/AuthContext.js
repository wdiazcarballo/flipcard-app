import React, { createContext, useState, useEffect } from 'react';
import API from '../api/axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ตรวจสอบสถานะการล็อกอินเมื่อโหลดแอปพลิเคชัน
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await API.get('/users/me');
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        setError('เซสชันหมดอายุ กรุณาล็อกอินใหม่');
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // ฟังก์ชันสำหรับการลงทะเบียน
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await API.post('/users/register', userData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการลงทะเบียน'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับการล็อกอิน
  const login = async (userData) => {
    setLoading(true);
    try {
      const response = await API.post('/users/login', userData);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการล็อกอิน'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันสำหรับการล็อกเอาท์
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};