const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    front: {
      type: String,
      required: [true, 'กรุณาระบุข้อความด้านหน้าการ์ด'],
      trim: true,
    },
    back: {
      type: Array,
      required: [true, 'กรุณาระบุข้อความด้านหลังการ์ด'],
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model('Card', cardSchema);
module.exports = Card;