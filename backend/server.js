const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const apiLimiter = require('./middleware/rateLimiter');
const { protect } = require('./middleware/auth');

// โหลดตัวแปรสภาพแวดล้อม
dotenv.config();

// เชื่อมต่อฐานข้อมูล
connectDB();

// ตั้งค่า Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api', apiLimiter);

// Routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cardRoutes = require('./routes/cardRoutes');
const cardController = require('./controllers/cardController');

app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/categories/:categoryId/cards', cardRoutes);

// Routes สำหรับการ์ดแบบอิสระ (ไม่ผ่าน categoryId)
app.get('/api/cards/:id', protect, cardController.getCardById);
app.put(
  '/api/cards/:id',
  [
    protect,
    require('express-validator').check('front', 'กรุณาระบุข้อความด้านหน้าการ์ด').not().isEmpty(),
    require('express-validator').check('back', 'กรุณาระบุข้อความด้านหลังการ์ด').isArray().not().isEmpty(),
  ],
  cardController.updateCard
);
app.delete('/api/cards/:id', protect, cardController.deleteCard);

// ตั้งค่า API สำหรับตรวจสอบสถานะ
app.get('/', (req, res) => {
  res.json({ message: 'API ของแอปพลิเคชัน Flip-Card' });
});

// จัดการข้อผิดพลาด
app.use(errorHandler);

// กำหนดพอร์ต
const PORT = process.env.PORT || 5000;

// เริ่มเซิร์ฟเวอร์
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่พอร์ต ${PORT} ในโหมด ${process.env.NODE_ENV}`);
});

// จัดการข้อผิดพลาดที่ไม่ได้จัดการ
process.on('unhandledRejection', (err, promise) => {
  console.error(`ข้อผิดพลาด: ${err.message}`);
  // ปิดเซิร์ฟเวอร์และออกจากกระบวนการ
  // server.close(() => process.exit(1));
});