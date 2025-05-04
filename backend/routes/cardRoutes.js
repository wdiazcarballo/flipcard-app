const express = require('express');
const { check } = require('express-validator');
const router = express.Router({ mergeParams: true });
const {
  createCard,
  getCards,
  getCardById,
  updateCard,
  deleteCard,
} = require('../controllers/cardController');
const { protect } = require('../middleware/auth');

// @route   POST /api/categories/:categoryId/cards
router.post(
  '/',
  [
    protect,
    check('front', 'กรุณาระบุข้อความด้านหน้าการ์ด').not().isEmpty(),
    check('back', 'กรุณาระบุข้อความด้านหลังการ์ด').isArray().not().isEmpty(),
  ],
  createCard
);

// @route   GET /api/categories/:categoryId/cards
router.get('/', protect, getCards);

// @route   GET /api/cards/:id (ต้องกำหนดใน server.js)
// @route   PUT /api/cards/:id (ต้องกำหนดใน server.js)
// @route   DELETE /api/cards/:id (ต้องกำหนดใน server.js)

module.exports = router;