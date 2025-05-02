const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

// @route   POST /api/categories
router.post(
  '/',
  [
    protect,
    check('name', 'กรุณาระบุชื่อหมวดหมู่').not().isEmpty(),
  ],
  createCategory
);

// @route   GET /api/categories
router.get('/', protect, getCategories);

// @route   GET /api/categories/:id
router.get('/:id', protect, getCategoryById);

// @route   PUT /api/categories/:id
router.put(
  '/:id',
  [
    protect,
    check('name', 'กรุณาระบุชื่อหมวดหมู่').not().isEmpty(),
  ],
  updateCategory
);

// @route   DELETE /api/categories/:id
router.delete('/:id', protect, deleteCategory);

module.exports = router;