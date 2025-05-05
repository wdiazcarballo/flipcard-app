import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

// Mock dependencies
jest.mock('react-router-dom', () => require('../../mocks/react-router-dom'));
jest.mock('../../context/AuthContext', () => require('../../mocks/AuthContext'));

// Create LoginWrapper component to handle context
const renderLogin = () => {
  return render(<Login />);
};

describe('Login Component', () => {
  test('แสดงฟอร์มล็อกอินถูกต้อง', () => {
    renderLogin();
    expect(screen.getByLabelText(/อีเมล/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/รหัสผ่าน/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /เข้าสู่ระบบ/i })).toBeInTheDocument();
  });

  test('แสดงข้อความเมื่อกรอกข้อมูลไม่ครบ', () => {
    renderLogin();
    
    // คลิกปุ่มเข้าสู่ระบบโดยไม่กรอกข้อมูล
    fireEvent.click(screen.getByRole('button', { name: /เข้าสู่ระบบ/i }));
    
    // ตรวจสอบว่ามีข้อความแจ้งเตือน
    expect(screen.getByText(/กรุณากรอกอีเมล/i)).toBeInTheDocument();
  });
});