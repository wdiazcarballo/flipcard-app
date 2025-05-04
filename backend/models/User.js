const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'กรุณาระบุชื่อผู้ใช้'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'กรุณาระบุอีเมล'],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'กรุณาระบุอีเมลที่ถูกต้อง',
      ],
    },
    password: {
      type: String,
      required: [true, 'กรุณาระบุรหัสผ่าน'],
      minlength: [8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'],
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

// เข้ารหัสรหัสผ่านก่อนบันทึก
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// เปรียบเทียบรหัสผ่าน
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;