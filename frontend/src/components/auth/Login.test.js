import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

test('แสดงฟอร์มล็อกอินถูกต้อง', () => {
  render(<Login />);
  expect(screen.getByLabelText(/อีเมล/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/รหัสผ่าน/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /เข้าสู่ระบบ/i })).toBeInTheDocument();
});

test('แสดงข้อความเมื่อกรอกข้อมูลไม่ครบ', () => {
  render(<Login />);
  
  // คลิกปุ่มเข้าสู่ระบบโดยไม่กรอกข้อมูล
  fireEvent.click(screen.getByRole('button', { name: /เข้าสู่ระบบ/i }));
  
  // ตรวจสอบว่ามีข้อความแจ้งเตือน
  expect(screen.getByText(/กรุณากรอกอีเมล/i)).toBeInTheDocument();
});