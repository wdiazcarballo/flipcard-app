const request = require('supertest');
const app = require('../server');

describe('การทดสอบ Auth API', () => {
  it('ควรแสดงข้อความต้อนรับจาก API', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
  
  it('ควรไม่สามารถเข้าสู่ระบบได้ด้วยข้อมูลไม่ถูกต้อง', async () => {
    const res = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'wrongpassword'
    });
    expect(res.statusCode).toEqual(401);
  });
  
  // เพิ่มการทดสอบอื่นๆ...
});