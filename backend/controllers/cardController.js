const Card = require('../models/Card');
const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @desc    สร้างการ์ด
// @route   POST /api/categories/:categoryId/cards
// @access  Private
exports.createCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { front, back } = req.body;
    const categoryId = req.params.categoryId;

    // ตรวจสอบว่าหมวดหมู่มีอยู่จริงและเป็นของผู้ใช้
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'ไม่พบหมวดหมู่' });
    }

    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เพิ่มการ์ดในหมวดหมู่นี้' });
    }

    // สร้างการ์ดใหม่
    const card = await Card.create({
      category: categoryId,
      front,
      back,
    });

    res.status(201).json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    รับการ์ดทั้งหมดในหมวดหมู่
// @route   GET /api/categories/:categoryId/cards
// @access  Private
exports.getCards = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // ตรวจสอบว่าหมวดหมู่มีอยู่จริง
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'ไม่พบหมวดหมู่' });
    }

    // ตรวจสอบความเป็นเจ้าของหรือสาธารณะ
    if (category.user.toString() !== req.user._id.toString() && !category.isPublic) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง' });
    }

    // รับการ์ดทั้งหมดในหมวดหมู่
    const cards = await Card.find({ category: categoryId });

    res.json({
      success: true,
      count: cards.length,
      data: cards,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    รับการ์ดตาม ID
// @route   GET /api/cards/:id
// @access  Private
exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate('category');

    if (!card) {
      return res.status(404).json({ success: false, message: 'ไม่พบการ์ด' });
    }

    // ตรวจสอบความเป็นเจ้าของหรือสาธารณะ
    if (
      card.category.user.toString() !== req.user._id.toString() &&
      !card.category.isPublic
    ) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง' });
    }

    res.json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    อัปเดตการ์ด
// @route   PUT /api/cards/:id
// @access  Private
exports.updateCard = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let card = await Card.findById(req.params.id).populate('category');

    if (!card) {
      return res.status(404).json({ success: false, message: 'ไม่พบการ์ด' });
    }

    // ตรวจสอบความเป็นเจ้าของ
    if (card.category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์แก้ไข' });
    }

    const { front, back } = req.body;

    // อัปเดตการ์ด
    card = await Card.findByIdAndUpdate(
      req.params.id,
      { front, back },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: card,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    ลบการ์ด
// @route   DELETE /api/cards/:id
// @access  Private
exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate('category');

    if (!card) {
      return res.status(404).json({ success: false, message: 'ไม่พบการ์ด' });
    }

    // ตรวจสอบความเป็นเจ้าของ
    if (card.category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์ลบ' });
    }

    await card.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};