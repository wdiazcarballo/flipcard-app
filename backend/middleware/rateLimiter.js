const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 นาที
  max: 100, // จำกัดคำขอสูงสุด 100 ครั้งต่อ IP ใน 15 นาที
  message: {
    success: false,
    message: 'มีคำขอมากเกินไป กรุณาลองใหม่ในอีก 15 นาที',
  },
});

module.exports = apiLimiter;