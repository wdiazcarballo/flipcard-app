import axios from 'axios';

// กำหนด API URL จากตัวแปรสภาพแวดล้อมหรือใช้ค่าเริ่มต้น
// ในโหมดพัฒนา React จะใช้ proxy ที่กำหนดใน package.json
// ในโหมดการผลิต (production) จะใช้ URL ของเซิร์ฟเวอร์จริง (EC2)
const getBaseURL = () => {
  // ตรวจสอบว่าเป็นโหมด development หรือไม่
  if (process.env.NODE_ENV === 'development') {
    return '/api'; // ใช้ proxy ในโหมด development
  }
  
  // ใช้ตัวแปรสภาพแวดล้อมหากมีการกำหนด
  if (process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}/api`;
  }
  
  // ใช้ window.location.origin สำหรับกรณีที่ backend และ frontend อยู่บนโดเมนเดียวกัน
  return `${window.location.origin}/api`;
};

// สร้างอินสแตนซ์ Axios
const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// เพิ่ม Interceptor สำหรับการแนบ Token ในทุกคำขอ
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;