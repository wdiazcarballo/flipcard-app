const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    
    // บันทึกข้อผิดพลาดไว้ในคอนโซลสำหรับการพัฒนา
    console.error(err);
    
    // Mongoose: ข้อผิดพลาด ObjectId ไม่ถูกต้อง
    if (err.name === 'CastError') {
      const message = 'ไม่พบข้อมูลที่ต้องการ';
      return res.status(404).json({ success: false, message });
    }
    
    // Mongoose: ข้อผิดพลาดเมื่อมีฟิลด์ซ้ำ
    if (err.code === 11000) {
      const message = 'มีข้อมูลนี้อยู่ในระบบแล้ว';
      return res.status(400).json({ success: false, message });
    }
    
    // Mongoose: ข้อผิดพลาดเมื่อการตรวจสอบล้มเหลว
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, message });
    }
    
    // ส่งข้อผิดพลาดทั่วไป
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'เกิดข้อผิดพลาดในเซิร์ฟเวอร์',
    });
  };
  
  module.exports = errorHandler;