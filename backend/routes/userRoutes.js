const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// @route   POST /api/users/register
router.post(
  '/register',
  [
    check('username', 'กรุณาระบุชื่อผู้ใช้').not().isEmpty(),
    check('email', 'กรุณาระบุอีเมลที่ถูกต้อง').isEmail(),
    check('password', 'กรุณาระบุรหัสผ่านที่มีความยาวอย่างน้อย 8 ตัวอักษร').isLength({ min: 8 }),
  ],
  registerUser
);

// @route   POST /api/users/login
router.post(
  '/login',
  [
    check('email', 'กรุณาระบุอีเมลที่ถูกต้อง').isEmail(),
    check('password', 'กรุณาระบุรหัสผ่าน').exists(),
  ],
  loginUser
);

// @route   GET /api/users/me
router.get('/me', protect, getUserProfile);

module.exports = router;