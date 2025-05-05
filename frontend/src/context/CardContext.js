import React, { createContext, useState, useCallback, useContext } from 'react';
import API from '../api/axios';
import { AuthContext } from './AuthContext';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ฟังก์ชันสำหรับการดึงหมวดหมู่ทั้งหมด
  const fetchCategories = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await API.get('/categories');
      setCategories(response.data.data);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลหมวดหมู่'
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  // ฟังก์ชันสำหรับการสร้างหมวดหมู่ใหม่
  const createCategory = useCallback(async (categoryData) => {
    setLoading(true);
    try {
      const response = await API.post('/categories', categoryData);
      setCategories([...categories, response.data.data]);
      setError(null);
      return response.data.data;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการสร้างหมวดหมู่'
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [categories]);

  // ฟังก์ชันสำหรับการอัปเดตหมวดหมู่
  const updateCategory = useCallback(async (id, categoryData) => {
    setLoading(true);
    try {
      const response = await API.put(`/categories/${id}`, categoryData);
      setCategories(
        categories.map((category) =>
          category._id === id ? response.data.data : category
        )
      );
      setError(null);
      return response.data.data;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตหมวดหมู่'
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [categories]);

  // ฟังก์ชันสำหรับการลบหมวดหมู่
  const deleteCategory = useCallback(async (id) => {
    setLoading(true);
    try {
      await API.delete(`/categories/${id}`);
      setCategories(categories.filter((category) => category._id !== id));
      setError(null);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการลบหมวดหมู่'
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [categories]);

  // ฟังก์ชันสำหรับการดึงการ์ดในหมวดหมู่
  const fetchCards = useCallback(async (categoryId) => {
    if (!categoryId) return;
    
    setLoading(true);
    try {
      const response = await API.get(`/categories/${categoryId}/cards`);
      setCards(response.data.data);
      
      // ดึงข้อมูลหมวดหมู่เพื่อตั้งค่า currentCategory
      const categoryResponse = await API.get(`/categories/${categoryId}`);
      setCurrentCategory(categoryResponse.data.data);
      
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการดึงข้อมูลการ์ด'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // ฟังก์ชันสำหรับการสร้างการ์ดใหม่
  const createCard = useCallback(async (categoryId, cardData) => {
    setLoading(true);
    console.log('Creating card with data:', cardData); // Debug log
    
    try {
      // Ensure that front is a non-empty string
      if (!cardData.front || typeof cardData.front !== 'string' || cardData.front.trim() === '') {
        console.error('Front data is invalid:', cardData.front);
        throw new Error('กรุณาระบุข้อความด้านหน้าการ์ด');
      }
      
      // Ensure back is a non-empty array
      if (!Array.isArray(cardData.back) || cardData.back.length === 0) {
        console.error('Back data is invalid:', cardData.back);
        throw new Error('กรุณาระบุข้อความด้านหลังการ์ด');
      }
      
      // Prepare the data exactly as the API expects it
      const preparedData = {
        front: cardData.front.trim(),
        back: cardData.back.map(item => item.toString().trim()).filter(item => item !== '')
      };
      
      console.log('Sending to API:', preparedData);
      
      // Make direct API request with explicit content type
      const response = await API.post(
        `/categories/${categoryId}/cards`,
        preparedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Card created successfully:', response.data);
      setCards([...cards, response.data.data]);
      setError(null);
      return response.data.data;
    } catch (error) {
      console.error('Error creating card:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      setError(
        error.response?.data?.message || error.message || 'เกิดข้อผิดพลาดในการสร้างการ์ด'
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [cards]);

  // ฟังก์ชันสำหรับการอัปเดตการ์ด
  const updateCard = useCallback(async (id, cardData) => {
    setLoading(true);
    try {
      const response = await API.put(`/cards/${id}`, cardData);
      setCards(
        cards.map((card) => (card._id === id ? response.data.data : card))
      );
      setError(null);
      return response.data.data;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตการ์ด'
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, [cards]);

  // ฟังก์ชันสำหรับการลบการ์ด
  const deleteCard = useCallback(async (id) => {
    setLoading(true);
    try {
      await API.delete(`/cards/${id}`);
      setCards(cards.filter((card) => card._id !== id));
      setError(null);
      return true;
    } catch (error) {
      setError(
        error.response?.data?.message || 'เกิดข้อผิดพลาดในการลบการ์ด'
      );
      return false;
    } finally {
      setLoading(false);
    }
  }, [cards]);

  return (
    <CardContext.Provider
      value={{
        categories,
        currentCategory,
        cards,
        loading,
        error,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchCards,
        createCard,
        updateCard,
        deleteCard,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};