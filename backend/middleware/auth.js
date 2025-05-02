const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware สำหรับป้องกันเส้นทางที่ต้องการการยืนยันตัวตน
exports.protect = async (req, res, next) => {
  let token;
  
  // ตรวจสอบว่ามี token ใน header หรือไม่
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // แยก token จาก Bearer token
    token = req.headers.authorization.split(' ')[1];
  }
  
  // ตรวจสอบว่ามี token หรือไม่
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'ไม่มีสิทธิ์เข้าถึง กรุณาล็อกอินก่อน' 
    });
  }
  
  try {
    // ตรวจสอบ token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ค้นหาผู้ใช้จาก id ใน token และเพิ่มเข้าไปใน req
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'ไม่มีสิทธิ์เข้าถึง' 
    });
  }
};

// Middleware สำหรับตรวจสอบบทบาท (role) ผู้ใช้
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'ไม่มีสิทธิ์เข้าถึงสำหรับบทบาทนี้' 
      });
    }
    next();
  };
};