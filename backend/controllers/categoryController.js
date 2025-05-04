const Category = require('../models/Category');
const { validationResult } = require('express-validator');

// @desc    สร้างหมวดหมู่
// @route   POST /api/categories
// @access  Private
exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    const { name, description, isPublic } = req.body;

    // สร้างหมวดหมู่ใหม่
    const category = await Category.create({
      name,
      description,
      user: req.user._id,
      isPublic,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    รับหมวดหมู่ทั้งหมดของผู้ใช้
// @route   GET /api/categories
// @access  Private
exports.getCategories = async (req, res) => {
  try {
    // ค้นหาหมวดหมู่ที่เป็นของผู้ใช้หรือหมวดหมู่สาธารณะ
    const categories = await Category.find({
      $or: [
        { user: req.user._id },
        { isPublic: true },
      ],
    });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    รับหมวดหมู่ตาม ID
// @route   GET /api/categories/:id
// @access  Private
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'ไม่พบหมวดหมู่' });
    }

    // ตรวจสอบความเป็นเจ้าของหรือสาธารณะ
    if (category.user.toString() !== req.user._id.toString() && !category.isPublic) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์เข้าถึง' });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    อัปเดตหมวดหมู่
// @route   PUT /api/categories/:id
// @access  Private
exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'ไม่พบหมวดหมู่' });
    }

    // ตรวจสอบความเป็นเจ้าของ
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์แก้ไข' });
    }

    const { name, description, isPublic } = req.body;

    // อัปเดตหมวดหมู่
    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, isPublic },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    ลบหมวดหมู่
// @route   DELETE /api/categories/:id
// @access  Private
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: 'ไม่พบหมวดหมู่' });
    }

    // ตรวจสอบความเป็นเจ้าของ
    if (category.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'ไม่มีสิทธิ์ลบ' });
    }

    await category.remove();

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};