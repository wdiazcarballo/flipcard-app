# แอปพลิเคชัน Flipcard

แอปพลิเคชันบัตรคำศัพท์ดิจิทัลสำหรับการเรียนรู้และทบทวนความรู้

## รายละเอียดโครงการ

แอปพลิเคชัน Flipcard เป็นเครื่องมือการเรียนรู้แบบโต้ตอบที่ช่วยให้ผู้ใช้สามารถสร้าง จัดการ และเล่นกับบัตรคำศัพท์ดิจิทัลเพื่อช่วยในการจดจำข้อมูลและการทบทวนความรู้ ผู้ใช้สามารถสร้างหมวดหมู่ของบัตรคำตามหัวข้อที่ต้องการเรียนรู้ เพิ่มบัตรคำใหม่ แก้ไข หรือลบบัตรคำที่มีอยู่ และเล่นเกมกับบัตรคำเพื่อทดสอบความรู้

## คุณสมบัติหลัก

- **ระบบสมาชิก**: ลงทะเบียน เข้าสู่ระบบ และจัดการโปรไฟล์ผู้ใช้
- **การจัดการหมวดหมู่**: สร้าง แก้ไข และลบหมวดหมู่บัตรคำ
- **การจัดการบัตรคำ**: สร้าง แก้ไข และลบบัตรคำในแต่ละหมวดหมู่
- **ส่วนผู้สร้าง**: อินเทอร์เฟซสำหรับผู้สร้างเนื้อหาในการจัดการบัตรคำและหมวดหมู่
- **ส่วนผู้เล่น**: อินเทอร์เฟซสำหรับผู้ใช้ในการเล่นและทบทวนบัตรคำ
- **เกมบัตรคำ**: ฟังก์ชันการพลิกบัตรคำและการทดสอบความรู้

## บทบาทผู้ใช้งาน (User Roles)

แอปพลิเคชัน Flipcard มีระบบบทบาทผู้ใช้งานที่แบ่งเป็น 2 ประเภทหลัก ได้แก่:

### 1. ผู้ใช้ทั่วไป (User)

ผู้ใช้ทั่วไปสามารถ:

- สร้างบัญชีและเข้าสู่ระบบ
- จัดการโปรไฟล์ส่วนตัว
- สร้าง แก้ไข และลบหมวดหมู่บัตรคำของตนเอง
- สร้าง แก้ไข และลบบัตรคำในหมวดหมู่ของตนเอง
- กำหนดให้หมวดหมู่เป็นสาธารณะหรือส่วนตัว
- เข้าถึงและเล่นกับหมวดหมู่บัตรคำสาธารณะที่ผู้ใช้อื่นสร้าง
- ใช้โหมดการเล่นต่างๆ เช่น การพลิกบัตรคำ การทดสอบแบบตัวเลือก หรือการเขียนตอบ
- ดูสถิติการเรียนรู้และผลคะแนนของตนเอง

### 2. ผู้ดูแลระบบ (Admin)

ผู้ดูแลระบบมีสิทธิ์ทั้งหมดที่ผู้ใช้ทั่วไปมี และเพิ่มเติมดังนี้:

- ดูแลและจัดการบัญชีผู้ใช้ทั้งหมด
- แก้ไขหรือลบหมวดหมู่และบัตรคำของผู้ใช้ทุกคน
- ตรวจสอบและจัดการเนื้อหาที่ไม่เหมาะสม
- เข้าถึงข้อมูลการใช้งานและสถิติของระบบ
- จัดการการแจ้งเตือนและประกาศระบบ
- ตรวจสอบและแก้ไขปัญหาที่เกิดขึ้นในระบบ

## การกำหนดสิทธิ์และการควบคุมการเข้าถึง

- **การเป็นเจ้าของทรัพยากร**: ผู้ใช้แต่ละคนจะสามารถจัดการ (แก้ไข/ลบ) ได้เฉพาะทรัพยากร (หมวดหมู่/บัตรคำ) ที่ตนเองเป็นเจ้าของเท่านั้น
- **การแบ่งปันหมวดหมู่**: ผู้ใช้สามารถตั้งค่าหมวดหมู่เป็นสาธารณะ ซึ่งจะให้ผู้ใช้อื่นเข้าถึงและเล่นกับบัตรคำได้ แต่ไม่สามารถแก้ไขหรือลบได้
- **การควบคุมการมองเห็น**: ผู้ใช้สามารถซ่อนหมวดหมู่ที่ตั้งค่าเป็นส่วนตัวจากผู้ใช้อื่น

## ระบบความปลอดภัย (Security)

แอปพลิเคชัน Flipcard ได้ถูกออกแบบและพัฒนาโดยคำนึงถึงความปลอดภัยในทุกขั้นตอน มีการใช้เทคโนโลยีและแนวปฏิบัติด้านความปลอดภัยที่เป็นมาตรฐานอุตสาหกรรม ดังนี้:

### การรับรองตัวตนและการจัดการสิทธิ์ (Authentication & Authorization)

1. **JSON Web Token (JWT)**

   - ใช้ JWT ในการรับรองตัวตนของผู้ใช้
   - โทเค็นมีอายุการใช้งาน 30 วัน เพื่อความสะดวกของผู้ใช้
   - การเข้ารหัสโทเค็นด้วยคีย์ลับที่กำหนดในไฟล์ .env
   - สอดแทรก Authorization Header สำหรับทุกคำขอ API ที่ต้องการการรับรองตัวตน

2. **Middleware การป้องกัน (Protect Middleware)**
   - ตรวจสอบความถูกต้องของ JWT ในทุกเส้นทาง API ที่ต้องการการรับรองตัวตน
   - สกัดและตรวจสอบข้อมูลผู้ใช้จาก JWT
   - ป้องกันเส้นทางส่วนตัวจากผู้ใช้ที่ไม่ได้รับอนุญาต
   - ตรวจสอบความเป็นเจ้าของทรัพยากรก่อนอนุญาตให้แก้ไขหรือลบ

### การรักษาความปลอดภัยรหัสผ่าน (Password Security)

1. **การแฮชรหัสผ่าน (Password Hashing)**

   - ใช้ bcryptjs ในการแฮชรหัสผ่านก่อนบันทึกลงฐานข้อมูล
   - ค่า Salt จำนวน 10 รอบเพื่อป้องกันการโจมตีแบบ Rainbow Table
   - ไม่มีการจัดเก็บรหัสผ่านแบบข้อความธรรมดา (Plain text)

2. **การตรวจสอบความแข็งแกร่งของรหัสผ่าน**
   - รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร
   - การตรวจสอบความถูกต้องของข้อมูลด้วย express-validator

### การป้องกันการโจมตี (Attack Prevention)

1. **การจำกัดอัตราการส่งคำขอ (Rate Limiting)**

   - ใช้ express-rate-limit เพื่อป้องกันการโจมตีแบบ Brute Force
   - จำกัดจำนวนคำขอเป็น 100 คำขอต่อ 15 นาทีสำหรับทุกเส้นทาง API
   - ป้องกันการโจมตีแบบ DDoS และการลองรหัสผ่านซ้ำๆ

2. **ส่วนหัวความปลอดภัย (Security Headers)**

   - ใช้ Helmet middleware เพื่อตั้งค่าส่วนหัว HTTP ที่เกี่ยวกับความปลอดภัย
   - ป้องกันการโจมตีแบบ XSS (Cross-Site Scripting)
   - ป้องกันการโจมตีแบบ Clickjacking
   - ป้องกันการสุ่มชนิด MIME (MIME-type sniffing)

3. **CORS (Cross-Origin Resource Sharing)**
   - ตั้งค่านโยบาย CORS เพื่อควบคุมการเข้าถึงทรัพยากรจากโดเมนอื่น
   - อนุญาตให้เฉพาะโดเมนที่เชื่อถือได้เท่านั้นที่สามารถเข้าถึง API

### การตรวจสอบความถูกต้องของข้อมูล (Validation)

1. **การตรวจสอบข้อมูลนำเข้า (Input Validation)**

   - ใช้ express-validator ในการตรวจสอบและทำความสะอาดข้อมูลนำเข้า
   - ตรวจสอบชนิดข้อมูล รูปแบบ และความถูกต้องของข้อมูลทุกประเภท
   - ป้องกันการโจมตีแบบ NoSQL Injection

2. **การจัดการข้อผิดพลาด (Error Handling)**
   - middleware จัดการข้อผิดพลาดแบบรวมศูนย์
   - ซ่อนข้อมูลสำคัญของระบบในข้อความแสดงข้อผิดพลาด
   - บันทึกข้อผิดพลาดเพื่อการตรวจสอบและแก้ไข

### การเฝ้าระวังและการบันทึก (Monitoring & Logging)

1. **การบันทึกกิจกรรม (Activity Logging)**

   - บันทึกกิจกรรมสำคัญและการเข้าสู่ระบบ
   - ตรวจจับกิจกรรมที่น่าสงสัยและความพยายามในการเข้าถึงที่ไม่ได้รับอนุญาต

2. **การจัดการข้อยกเว้น (Exception Handling)**
   - การตรวจจับและจัดการข้อยกเว้นที่ไม่ได้จัดการ (Unhandled exceptions)
   - ป้องกันการรั่วไหลของข้อมูลในกรณีที่เกิดข้อผิดพลาด

## เทคโนโลยีที่ใช้

### Frontend

- React.js
- Context API สำหรับการจัดการสถานะ
- CSS สำหรับการออกแบบส่วนติดต่อผู้ใช้

### Backend

- Node.js และ Express.js
- MongoDB สำหรับฐานข้อมูล
- JWT สำหรับการรับรองความถูกต้อง
- Middleware สำหรับการป้องกันการเข้าถึงและการจัดการข้อผิดพลาด

## การติดตั้ง

### ข้อกำหนดเบื้องต้น

- Node.js (เวอร์ชัน 14.x หรือสูงกว่า)
- npm (เวอร์ชัน 6.x หรือสูงกว่า)
- MongoDB (การติดตั้งในเครื่องหรือ MongoDB Atlas)

### ขั้นตอนการติดตั้ง

1. โคลนโครงการ

```
git clone https://github.com/wdiazcarballo/flipcard-app.git
cd flipcard-app
```

2. ติดตั้ง dependencies สำหรับ backend

```
cd backend
npm install
```

3. ติดตั้ง dependencies สำหรับ frontend

```
cd ../frontend
npm install
```

4. ตั้งค่าตัวแปรสภาพแวดล้อม
   - สร้างไฟล์ `.env` ในโฟลเดอร์ backend และกำหนดค่าตัวแปรต่อไปนี้:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

## การใช้งาน

1. เริ่มต้น backend server

```
cd backend
npm run dev
```

2. เริ่มต้น frontend development server

```
cd frontend
npm start
```

3. เปิดเบราว์เซอร์และเข้าไปที่ `http://localhost:3000`

## โครงสร้างโปรเจค

```
flipcard-app/
├── backend/
│   ├── config/        # การตั้งค่าฐานข้อมูลและการเชื่อมต่อ
│   ├── controllers/   # ตัวควบคุมสำหรับการจัดการคำขอ API
│   ├── middleware/    # Middleware สำหรับการรับรองความถูกต้องและการจัดการข้อผิดพลาด
│   ├── models/        # โมเดลฐานข้อมูล MongoDB
│   ├── routes/        # เส้นทาง API
│   ├── utils/         # ฟังก์ชันยูทิลิตี้
│   └── server.js      # จุดเริ่มต้นของ backend
│
└── frontend/
    ├── public/        # ไฟล์สาธารณะ
    └── src/
        ├── api/       # การตั้งค่า Axios และการเชื่อมต่อ API
        ├── components/ # คอมโพเนนต์ React
        │   ├── auth/   # คอมโพเนนต์การรับรองความถูกต้อง
        │   ├── common/ # คอมโพเนนต์ทั่วไป
        │   ├── creator/ # คอมโพเนนต์สำหรับผู้สร้าง
        │   └── player/ # คอมโพเนนต์สำหรับผู้เล่น
        ├── context/   # Context API สำหรับการจัดการสถานะ
        ├── pages/     # หน้าคอมโพเนนต์
        └── styles/    # ไฟล์ CSS
```

## คู่มือฝึกฝนการพัฒนา Full Stack สำหรับนักศึกษาวิชา DTI 201

โปรเจค Flipcard นี้ใช้เพื่อการเรียนรู้การพัฒนาแบบ Full Stack ตั้งแต่เริ่มต้นจนถึงการนำไปใช้งานจริง โดยทำตามขั้นตอนต่อไปนี้

### 1. เริ่มต้นกับ Backend (ฝั่งเซิร์ฟเวอร์)

**สิ่งที่ได้เรียนรู้:**

- การสร้างเซิร์ฟเวอร์ด้วย Express
- การเชื่อมต่อกับฐานข้อมูล MongoDB
- การสร้าง API สำหรับแอปพลิเคชัน

**ขั้นตอนการทำ:**

1. **ติดตั้ง Node.js และ npm**

   - ดาวน์โหลดและติดตั้ง Node.js จาก [nodejs.org](https://nodejs.org/)
   - ตรวจสอบการติดตั้งด้วยคำสั่ง:

   ```
   node --version
   npm --version
   ```

2. **สร้างโฟลเดอร์โปรเจค**

   ```
   mkdir flipcard-app
   cd flipcard-app
   mkdir backend
   cd backend
   ```

3. **เริ่มต้นโปรเจค Node.js**

   ```
   npm init -y
   ```

4. **ติดตั้งแพ็กเกจที่จำเป็น**

   ```
   npm install express mongoose dotenv bcryptjs jsonwebtoken cors helmet express-validator express-rate-limit
   npm install -D nodemon
   ```

5. **สร้างโครงสร้างไฟล์**

   ```
   mkdir config controllers middleware models routes utils
   touch server.js .env
   ```

6. **เขียนโค้ดเชื่อมต่อฐานข้อมูล** (ตัวอย่าง config/db.js)

   ```javascript
   const mongoose = require("mongoose");

   const connectDB = async () => {
     try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`เชื่อมต่อ MongoDB สำเร็จ: ${conn.connection.host}`);
     } catch (error) {
       console.error(`เกิดข้อผิดพลาด: ${error.message}`);
       process.exit(1);
     }
   };

   module.exports = connectDB;
   ```

7. **สร้างเซิร์ฟเวอร์หลัก** (server.js)

   ```javascript
   const express = require("express");
   const dotenv = require("dotenv");
   const connectDB = require("./config/db");
   // โหลดโมดูลอื่นๆ ตามต้องการ

   // โหลดตัวแปรสภาพแวดล้อม
   dotenv.config();

   // เชื่อมต่อฐานข้อมูล
   connectDB();

   const app = express();

   // Middleware
   app.use(express.json());

   // เส้นทาง API
   app.get("/", (req, res) => {
     res.json({ message: "ยินดีต้อนรับสู่ API ของแอป Flipcard" });
   });

   // กำหนดพอร์ต
   const PORT = process.env.PORT || 5000;

   // เริ่มเซิร์ฟเวอร์
   app.listen(PORT, () => {
     console.log(`เซิร์ฟเวอร์ทำงานที่พอร์ต ${PORT}`);
   });
   ```

8. **เพิ่มสคริปท์ในไฟล์ package.json**

   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

9. **สร้างไฟล์ .env สำหรับตัวแปรสภาพแวดล้อม**

   ```
   PORT=5000
   MONGO_URI=mongodb+srv://ชื่อผู้ใช้:รหัสผ่าน@cluster.mongodb.net/flipcard
   JWT_SECRET=รหัสลับสำหรับโทเค็น
   NODE_ENV=development
   ```

10. **ทดสอบรันเซิร์ฟเวอร์**
    ```
    npm run dev
    ```

### 2. พัฒนา Frontend (ฝั่งผู้ใช้)

**สิ่งที่น้องๆ จะได้เรียนรู้:**

- การสร้างแอปพลิเคชัน React
- การออกแบบหน้าจอและคอมโพเนนต์
- การเชื่อมต่อกับ Backend API

**ขั้นตอนการทำ:**

1. **สร้างโปรเจค React**

   ```
   cd ..
   npx create-react-app frontend
   cd frontend
   ```

2. **ติดตั้งแพ็กเกจที่จำเป็น**

   ```
   npm install axios react-router-dom
   ```

3. **สร้างโครงสร้างโฟลเดอร์**

   ```
   mkdir -p src/components/{auth,common,creator,player} src/context src/pages src/api src/styles
   ```

4. **ตั้งค่าการเชื่อมต่อ API** (src/api/axios.js)

   ```javascript
   import axios from "axios";

   const API = axios.create({
     baseURL: "http://localhost:5000/api",
     headers: {
       "Content-Type": "application/json",
     },
   });

   // เพิ่ม Token ในส่วนหัวของคำขอ
   API.interceptors.request.use((config) => {
     const token = localStorage.getItem("token");
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   export default API;
   ```

5. **สร้างเส้นทางหลักของแอป** (App.js)

   ```javascript
   import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
   import HomePage from "./pages/HomePage";
   import LoginPage from "./components/auth/Login";
   import RegisterPage from "./components/auth/Register";
   // นำเข้าคอมโพเนนต์อื่นๆ

   function App() {
     return (
       <Router>
         <Routes>
           <Route path="/" element={<HomePage />} />
           <Route path="/login" element={<LoginPage />} />
           <Route path="/register" element={<RegisterPage />} />
           {/* เพิ่มเส้นทางอื่นๆ */}
         </Routes>
       </Router>
     );
   }

   export default App;
   ```

6. **ทดสอบแอป React**
   ```
   npm start
   ```

### 3. การทดสอบแอปพลิเคชัน (Testing)

**สิ่งที่นักศึกษาจะได้เรียนรู้:**
- การทดสอบคอมโพเนนต์และ API
- การทดสอบอัตโนมัติ
- การวิเคราะห์คุณภาพโค้ด

#### 3.1 การทดสอบ Backend

Backend ใช้ Jest และ Supertest สำหรับการทดสอบ API และฟังก์ชันการทำงาน

1. **การติดตั้งและการตั้งค่า**

   ```bash
   cd backend
   npm install --save-dev jest supertest
   ```

   เพิ่มคำสั่งทดสอบใน `package.json`:
   ```json
   "scripts": {
     "test": "jest --detectOpenHandles --forceExit",
     "test:watch": "jest --watch",
     "test:coverage": "jest --coverage"
   }
   ```

2. **การเขียนการทดสอบ API**

   สร้างไฟล์ `tests/auth.test.js`:
   ```javascript
   const request = require('supertest');
   const app = require('../server');
   
   // ต้องแน่ใจว่าเซิร์ฟเวอร์ไม่ได้กำลังทำงานระหว่างการทดสอบ
   
   describe('การทดสอบ Auth API', () => {
     // ทดสอบ endpoint สำหรับการตรวจสอบสถานะ
     it('ควรแสดงข้อความต้อนรับจาก API', async () => {
       const res = await request(app).get('/');
       expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty('message');
     });
     
     // ทดสอบการเข้าสู่ระบบด้วยข้อมูลไม่ถูกต้อง
     it('ควรไม่สามารถเข้าสู่ระบบได้ด้วยข้อมูลไม่ถูกต้อง', async () => {
       const res = await request(app).post('/api/users/login').send({
         email: 'test@example.com',
         password: 'wrongpassword'
       });
       expect(res.statusCode).toEqual(401);
     });
     
     // เพิ่มการทดสอบอื่นๆ ตามต้องการ...
   });
   ```

3. **การทดสอบ Controllers**

   สร้างไฟล์ `tests/controllers/userController.test.js`:
   ```javascript
   const { registerUser, loginUser } = require('../../controllers/userController');
   const User = require('../../models/User');
   
   // Mock โมเดล User
   jest.mock('../../models/User');
   
   describe('User Controller', () => {
     let req, res;
     
     beforeEach(() => {
       // สร้าง mock request และ response
       req = {
         body: {},
       };
       res = {
         status: jest.fn().mockReturnThis(),
         json: jest.fn(),
       };
     });
     
     it('registerUser ควรสร้างผู้ใช้ใหม่และส่งกลับ token', async () => {
       // จำลองข้อมูลผู้ใช้
       req.body = {
         name: 'Test User',
         email: 'test@example.com',
         password: 'password123'
       };
       
       // จำลองการเรียกใช้ User.findOne และ user.save
       User.findOne.mockResolvedValue(null);
       User.mockImplementation(() => ({
         save: jest.fn().mockResolvedValue({
           _id: 'mock-id',
           name: 'Test User',
           email: 'test@example.com',
         }),
       }));
       
       await registerUser(req, res);
       
       expect(res.status).toHaveBeenCalledWith(201);
       expect(res.json).toHaveBeenCalledWith(
         expect.objectContaining({
           token: expect.any(String),
         })
       );
     });
     
     // เพิ่มการทดสอบอื่นๆ ตามต้องการ...
   });
   ```

4. **การรันการทดสอบ**

   ```bash
   npm test                # รันทุกการทดสอบ
   npm test -- -t "auth"   # รันเฉพาะการทดสอบที่มีคำว่า "auth"
   npm run test:coverage   # รันการทดสอบพร้อมรายงานความครอบคลุม
   ```

#### 3.2 การทดสอบ Frontend

Frontend ใช้ React Testing Library และ Jest สำหรับการทดสอบคอมโพเนนต์และการทำงาน

1. **การติดตั้งและการตั้งค่า**

   Create React App มาพร้อมกับ Jest และ React Testing Library แล้ว แต่อาจต้องติดตั้งเพิ่มเติม:
   ```bash
   cd frontend
   npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

   อัปเดต `package.json`:
   ```json
   "scripts": {
     "test": "react-scripts test --transformIgnorePatterns \"node_modules/(?!axios)/\"",
     "test:ci": "react-scripts test --transformIgnorePatterns \"node_modules/(?!axios)/\" --watchAll=false --ci"
   }
   ```

2. **การตั้งค่าสภาพแวดล้อมการทดสอบ**

   โปรเจคนี้มีการจัดการการทดสอบด้วยไฟล์ต่างๆ:
   
   - `src/setupTests.js` สำหรับการตั้งค่าสภาพแวดล้อมการทดสอบ
   - `src/mocks/` โฟลเดอร์สำหรับ mock modules ต่างๆ (เช่น react-router-dom, AuthContext)
   - `jest.config.js` สำหรับการกำหนดค่า Jest

   ```javascript
   // src/setupTests.js
   import '@testing-library/jest-dom';
   
   // Mock external modules
   jest.mock('react-router-dom', () => require('../mocks/react-router-dom'));
   
   // Clear mocks between tests
   afterEach(() => {
     jest.clearAllMocks();
   });
   ```

3. **การสร้าง Mock**

   สร้าง mock สำหรับ components และ contexts:
   
   ```javascript
   // src/mocks/react-router-dom.js
   export const BrowserRouter = ({ children }) => children;
   export const Routes = ({ children }) => children;
   export const Route = ({ children }) => children;
   export const Link = ({ children, to }) => <a href={to}>{children}</a>;
   export const useNavigate = () => jest.fn();
   export const useLocation = () => ({ pathname: '/' });
   
   // src/mocks/AuthContext.js
   import React from 'react';
   
   export const mockAuthContext = {
     login: jest.fn().mockResolvedValue(true),
     register: jest.fn().mockResolvedValue(true),
     logout: jest.fn(),
     user: null,
     error: null,
   };
   
   export const AuthContext = React.createContext(mockAuthContext);
   export const AuthProvider = ({ children }) => (
     <AuthContext.Provider value={mockAuthContext}>{children}</AuthContext.Provider>
   );
   ```

4. **การเขียนการทดสอบคอมโพเนนต์**

   สร้างไฟล์ `src/components/auth/Login.test.js`:
   ```javascript
   import { render, screen, fireEvent } from '@testing-library/react';
   import Login from './Login';
   
   // Mock dependencies
   jest.mock('react-router-dom', () => require('../../mocks/react-router-dom'));
   jest.mock('../../context/AuthContext', () => require('../../mocks/AuthContext'));
   
   describe('Login Component', () => {
     test('แสดงฟอร์มล็อกอินถูกต้อง', () => {
       render(<Login />);
       expect(screen.getByLabelText(/อีเมล/i)).toBeInTheDocument();
       expect(screen.getByLabelText(/รหัสผ่าน/i)).toBeInTheDocument();
       expect(screen.getByRole('button', { name: /เข้าสู่ระบบ/i })).toBeInTheDocument();
     });
   
     test('แสดงข้อความเมื่อกรอกข้อมูลไม่ครบ', () => {
       render(<Login />);
       
       // คลิกปุ่มเข้าสู่ระบบโดยไม่กรอกข้อมูล
       fireEvent.click(screen.getByRole('button', { name: /เข้าสู่ระบบ/i }));
       
       // ตรวจสอบว่ามีข้อความแจ้งเตือน
       expect(screen.getByText(/กรุณากรอกอีเมล/i)).toBeInTheDocument();
     });
   });
   ```

5. **การทดสอบ App Component**

   สร้างไฟล์ `src/App.test.js`:
   ```javascript
   import { render, screen } from '@testing-library/react';
   import App from './App';
   
   // Mock dependencies
   jest.mock('./context/AuthContext', () => require('./mocks/AuthContext'));
   jest.mock('./context/CardContext', () => ({
     CardContext: { Provider: ({ children }) => children },
     CardProvider: ({ children }) => children,
   }));
   
   jest.mock('./components/common/Layout', () => ({
     __esModule: true,
     default: ({ children }) => <div data-testid="layout">{children}</div>,
   }));
   
   test('renders application layout', () => {
     render(<App />);
     expect(screen.getByTestId('layout')).toBeInTheDocument();
   });
   ```

6. **การรันการทดสอบ**

   ```bash
   npm test                # รันการทดสอบในโหมด watch
   npm run test:ci         # รันการทดสอบครั้งเดียว (สำหรับ CI)
   npm test -- --coverage  # รันการทดสอบพร้อมรายงานความครอบคลุม
   ```

#### 3.3 การทดสอบ End-to-End (E2E)

การทดสอบ E2E ใช้ Cypress เพื่อทดสอบการทำงานของแอปพลิเคชันทั้งหมด

1. **การติดตั้งและการตั้งค่า**

   ```bash
   cd frontend
   npm install --save-dev cypress
   ```

   เพิ่มคำสั่งใน `package.json`:
   ```json
   "scripts": {
     "cypress:open": "cypress open",
     "cypress:run": "cypress run",
     "test:e2e": "cypress run"
   }
   ```

2. **การตั้งค่า Cypress**

   เมื่อรัน Cypress ครั้งแรก จะสร้างโครงสร้างไฟล์:
   ```bash
   npm run cypress:open
   ```

   สร้างไฟล์ `cypress.json`:
   ```json
   {
     "baseUrl": "http://localhost:3000",
     "viewportWidth": 1280,
     "viewportHeight": 720
   }
   ```

3. **การเขียนการทดสอบ E2E**

   สร้างไฟล์ `cypress/integration/auth.spec.js`:
   ```javascript
   describe('Authentication', () => {
     beforeEach(() => {
       // รีเซ็ต state ก่อนทำการทดสอบแต่ละครั้ง
       cy.visit('/');
     });
   
     it('ควรสามารถเข้าสู่หน้าล็อกอินได้', () => {
       cy.visit('/login');
       cy.get('h2').should('contain', 'เข้าสู่ระบบ');
       cy.get('input[name="email"]').should('exist');
       cy.get('input[name="password"]').should('exist');
       cy.get('button[type="submit"]').should('exist');
     });
   
     it('ควรแสดงข้อความข้อผิดพลาดเมื่อกรอกข้อมูลไม่ครบ', () => {
       cy.visit('/login');
       cy.get('button[type="submit"]').click();
       cy.get('div').should('contain', 'กรุณาระบุอีเมล');
     });
   
     it('ควรแสดงข้อความข้อผิดพลาดเมื่อล็อกอินด้วยข้อมูลไม่ถูกต้อง', () => {
       cy.visit('/login');
       cy.get('input[name="email"]').type('wrong@example.com');
       cy.get('input[name="password"]').type('wrongpassword');
       cy.get('button[type="submit"]').click();
       
       // รอข้อความข้อผิดพลาดจาก API
       cy.get('div[role="alert"]', { timeout: 5000 }).should('be.visible');
     });
   });
   ```

4. **การรันการทดสอบ E2E**

   ```bash
   # ต้องรัน backend และ frontend ก่อน
   cd backend && npm run dev
   cd frontend && npm start
   
   # รันการทดสอบแบบ interactive
   npm run cypress:open
   
   # รันการทดสอบแบบ headless
   npm run cypress:run
   ```

#### 3.4 เคล็ดลับการทดสอบ

1. **การทดสอบการทำงานร่วมกันของ Frontend และ Backend**
   - ใช้ `supertest` สำหรับการทดสอบ API โดยตรง
   - ใช้ Cypress สำหรับการทดสอบแบบ End-to-End

2. **การใช้ Mock ที่เหมาะสม**
   - Mock external services (เช่น Auth API) เพื่อป้องกันการเรียกใช้งานจริงระหว่างการทดสอบ
   - Mock modules ที่ไม่เกี่ยวข้องกับสิ่งที่กำลังทดสอบ

3. **การวิเคราะห์ความครอบคลุมของการทดสอบ**
   - รันการทดสอบพร้อมรายงานความครอบคลุม
   - ตั้งเป้าหมายความครอบคลุมสำหรับโค้ดสำคัญ (เช่น > 80%)

4. **การตรวจสอบประสิทธิภาพ**
   - ใช้เครื่องมือเช่น Lighthouse หรือ WebPageTest สำหรับวิเคราะห์ประสิทธิภาพ
   - ตรวจสอบหน่วยความจำรั่วไหลด้วย Chrome DevTools

5. **การวิเคราะห์คุณภาพโค้ด**
   - ใช้ ESLint สำหรับตรวจสอบคุณภาพโค้ด
   - ใช้ Prettier สำหรับการจัดรูปแบบโค้ดให้คงที่

#### 3.5 การแก้ไขปัญหาการทดสอบที่พบบ่อย

1. **ปัญหา "Cannot find module 'react-router-dom'"**
   - สร้างไฟล์ mock สำหรับ react-router-dom
   - ใช้ transformIgnorePatterns ใน Jest config เพื่อจัดการกับ ES modules

2. **ปัญหา "Timeout waiting for element"**
   - เพิ่มเวลา timeout ในการทดสอบ E2E
   - ตรวจสอบเงื่อนไขการทดสอบและการเรียกใช้ API

3. **ปัญหา "Error: Cross origin http://localhost forbidden"**
   - ตั้งค่า CORS ในเซิร์ฟเวอร์ให้ถูกต้อง
   - ใช้ proxy ใน Create React App development server

### 4. การสร้างคอนเทนเนอร์ด้วย Docker

**สิ่งที่นักศึกษาจะได้เรียนรู้:**
- หลักการของการทำงานแบบคอนเทนเนอร์
- การสร้างและจัดการคอนเทนเนอร์ด้วย Docker
- การใช้ Docker Compose ในการรัน Multi-container

**ขั้นตอนการทำ:**

1. **ติดตั้ง Docker และ Docker Compose**
   - ดาวน์โหลดและติดตั้ง Docker Desktop จาก [docker.com](https://www.docker.com/products/docker-desktop)
   - ตรวจสอบการติดตั้ง:
   ```
   docker --version
   docker-compose --version
   ```

2. **สร้าง Dockerfile สำหรับ Backend**

   - สร้างไฟล์ `backend/Dockerfile`:
   ```dockerfile
   FROM node:16-alpine
   
   WORKDIR /usr/src/app
   
   COPY package*.json ./
   
   RUN npm install --production
   
   COPY . .
   
   EXPOSE 5000
   
   CMD ["npm", "start"]
   ```

3. **สร้าง Dockerfile สำหรับ Frontend**

   - สร้างไฟล์ `frontend/Dockerfile`:
   ```dockerfile
   # Stage 1: Build React App
   FROM node:16-alpine as build
   
   WORKDIR /usr/src/app
   
   COPY package*.json ./
   
   RUN npm install
   
   COPY . .
   
   RUN npm run build
   
   # Stage 2: Set up Nginx to serve frontend
   FROM nginx:alpine
   
   COPY --from=build /usr/src/app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   
   EXPOSE 80
   
   CMD ["nginx", "-g", "daemon off;"]
   ```

4. **สร้างไฟล์ Nginx Configuration สำหรับ Frontend**

   - สร้างไฟล์ `frontend/nginx.conf`:
   ```
   server {
       listen 80;
       
       location / {
           root /usr/share/nginx/html;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       location /api {
           proxy_pass http://backend:5000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **สร้างไฟล์ Docker Compose**

   - สร้างไฟล์ `docker-compose.yml` ในโฟลเดอร์หลัก:
   ```yaml
   version: '3.8'
   
   services:
     backend:
       build: ./backend
       container_name: flipcard-backend
       restart: always
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
         - PORT=5000
         - MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/flipcard
         - JWT_SECRET=your_jwt_secret_key
       networks:
         - app-network
   
     frontend:
       build: ./frontend
       container_name: flipcard-frontend
       restart: always
       ports:
         - "80:80"
       depends_on:
         - backend
       networks:
         - app-network
   
   networks:
     app-network:
       driver: bridge
   ```

6. **สร้างไฟล์ .dockerignore**

   - สร้างไฟล์ `.dockerignore` ในโฟลเดอร์ backend และ frontend:
   ```
   node_modules
   npm-debug.log
   .git
   .env
   .env.local
   .env.development.local
   .env.test.local
   .env.production.local
   ```

7. **สร้างและรันคอนเทนเนอร์**

   ```bash
   # สร้างและรันคอนเทนเนอร์ในโหมด detached
   docker-compose up -d --build
   
   # ดูสถานะของคอนเทนเนอร์
   docker-compose ps
   
   # ดูล็อกของคอนเทนเนอร์
   docker-compose logs -f
   ```

8. **เข้าถึงแอปพลิเคชัน**
   - เปิดเบราว์เซอร์และเข้า `http://localhost`

9. **หยุดคอนเทนเนอร์**
   ```bash
   docker-compose down
   ```

### 5. การตั้งค่า CI/CD

**สิ่งที่นักศึกษาจะได้เรียนรู้:**
- กระบวนการ Continuous Integration/Continuous Deployment
- การใช้ GitHub Actions หรือ GitLab CI/CD
- การนำขึ้นใช้งานอัตโนมัติ

**ขั้นตอนการทำ:**

1. **สร้างไฟล์ GitHub Actions**

   - สร้างโฟลเดอร์ `.github/workflows` ในโฟลเดอร์หลัก
   - สร้างไฟล์ `.github/workflows/ci-cd.yml`:
   ```yaml
   name: CI/CD Pipeline
   
   on:
     push:
       branches: [ main ]
     pull_request:
       branches: [ main ]
   
   jobs:
     test:
       name: Test
       runs-on: ubuntu-latest
       
       steps:
       - uses: actions/checkout@v2
       
       - name: Setup Node.js
         uses: actions/setup-node@v2
         with:
           node-version: '16'
       
       - name: Install Backend Dependencies
         run: |
           cd backend
           npm install
       
       - name: Run Backend Tests
         run: |
           cd backend
           npm test
       
       - name: Install Frontend Dependencies
         run: |
           cd frontend
           npm install
       
       - name: Run Frontend Tests
         run: |
           cd frontend
           npm test -- --watchAll=false
   
     build-and-deploy:
       name: Build and Deploy
       runs-on: ubuntu-latest
       needs: test
       if: github.event_name == 'push' && github.ref == 'refs/heads/main'
       
       steps:
       - uses: actions/checkout@v2
       
       - name: Set up Docker Buildx
         uses: docker/setup-buildx-action@v1
       
       - name: Login to DockerHub
         uses: docker/login-action@v1
         with:
           username: ${{ secrets.DOCKERHUB_USERNAME }}
           password: ${{ secrets.DOCKERHUB_TOKEN }}
       
       - name: Build and Push Backend
         uses: docker/build-push-action@v2
         with:
           context: ./backend
           push: true
           tags: yourusername/flipcard-backend:latest
       
       - name: Build and Push Frontend
         uses: docker/build-push-action@v2
         with:
           context: ./frontend
           push: true
           tags: yourusername/flipcard-frontend:latest
       
       - name: Deploy to EC2
         uses: appleboy/ssh-action@master
         with:
           host: ${{ secrets.EC2_HOST }}
           username: ${{ secrets.EC2_USERNAME }}
           key: ${{ secrets.EC2_PRIVATE_KEY }}
           script: |
             cd ~/flipcard-app
             git pull
             docker-compose pull
             docker-compose up -d
   ```

2. **ตั้งค่า Secrets ใน GitHub**

   - ไปที่ GitHub repository > Settings > Secrets > New repository secret
   - เพิ่ม secrets ต่อไปนี้:
     - `DOCKERHUB_USERNAME`: ชื่อผู้ใช้ Docker Hub
     - `DOCKERHUB_TOKEN`: token สำหรับเข้าถึง Docker Hub
     - `EC2_HOST`: IP ของ EC2 instance
     - `EC2_USERNAME`: ชื่อผู้ใช้สำหรับเข้าถึง EC2 (เช่น ubuntu)
     - `EC2_PRIVATE_KEY`: คีย์ส่วนตัว SSH สำหรับเข้าถึง EC2

3. **ตั้งค่า EC2 Instance**

   - ติดตั้ง Docker และ Docker Compose:
   ```bash
   sudo apt-get update
   sudo apt-get install -y docker.io
   sudo systemctl enable docker
   sudo systemctl start docker
   sudo usermod -aG docker $USER
   
   # ติดตั้ง Docker Compose
   sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

   - โคลนโปรเจค:
   ```bash
   git clone https://github.com/yourusername/flipcard-app.git
   cd flipcard-app
   ```

   - สร้างไฟล์ docker-compose.yml สำหรับ Production:
   ```yaml
   version: '3.8'
   
   services:
     backend:
       image: yourusername/flipcard-backend:latest
       container_name: flipcard-backend
       restart: always
       environment:
         - NODE_ENV=production
         - PORT=5000
         - MONGO_URI=${MONGO_URI}
         - JWT_SECRET=${JWT_SECRET}
       networks:
         - app-network
   
     frontend:
       image: yourusername/flipcard-frontend:latest
       container_name: flipcard-frontend
       restart: always
       ports:
         - "80:80"
       depends_on:
         - backend
       networks:
         - app-network
   
   networks:
     app-network:
       driver: bridge
   ```

4. **ทดสอบกระบวนการ CI/CD**

   - สร้างการเปลี่ยนแปลงในโค้ด
   - Commit และ Push การเปลี่ยนแปลงไปยัง main branch
   - ตรวจสอบการทำงานของ GitHub Actions ที่ Actions tab
   - ตรวจสอบว่าแอปพลิเคชันถูกปรับปรุงบน EC2 instance

### 6. นำขึ้นใช้งานบน AWS EC2 แบบง่าย

**สิ่งที่นักศึกษาจะได้เรียนรู้:**

- การตั้งค่าเซิร์ฟเวอร์บนคลาวด์
- การนำแอปพลิเคชันขึ้นใช้งานจริง
- การเชื่อมต่อโดเมนกับเซิร์ฟเวอร์

**ขั้นตอนการทำ:**

1. **สร้างบัญชี AWS**

   - สมัครใช้งาน [AWS Free Tier](https://aws.amazon.com/free/)
   - เข้าสู่ AWS Management Console

2. **สร้าง EC2 Instance**

   - เลือก "EC2" จากรายการบริการ
   - คลิก "Launch Instance"
   - เลือก Ubuntu Server 20.04 LTS 
   - เลือกประเภท t2.micro (ฟรีในปีแรก)
   - ตั้งค่ากลุ่มความปลอดภัย (Security Group) ให้อนุญาตพอร์ตดังนี้:
     - 22 (SSH): สำหรับการเข้าถึง SSH
     - 80 (HTTP): สำหรับการเข้าถึงเว็บไซต์
     - 443 (HTTPS): สำหรับการเข้าถึงเว็บไซต์แบบปลอดภัย
     - 5000 (Express API): สำหรับการเข้าถึง API โดยตรง (หรือปิดไว้สำหรับการ proxy ผ่าน Nginx)
   - สร้างและดาวน์โหลดคีย์แพร์ (.pem file)
   - คลิก "Launch Instance"

3. **เชื่อมต่อกับ EC2**

   **สำหรับ Windows**
   - ใช้ Mobaxterm, PuTTY หรือ Windows Terminal เพื่อเชื่อมต่อกับ EC2
   - หรือใช้ EC2 online console ใน AWS Management Console

   **สำหรับ Mac/Linux**
   ```bash
   chmod 400 your-key.pem
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

4. **ติดตั้งซอฟต์แวร์ที่จำเป็น**

   ```bash
   # อัปเดตแพ็กเกจ
   sudo apt update && sudo apt upgrade -y
   
   # ติดตั้ง Git และ Nginx
   sudo apt install -y git nginx

   # ติดตั้ง Node.js 16 (หรือเวอร์ชันที่ต้องการ)
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs

   # ตรวจสอบการติดตั้ง
   node --version  # ควรแสดง v16.x.x
   npm --version   # ควรแสดง 8.x.x

   # ติดตั้ง PM2 สำหรับจัดการกระบวนการ Node.js
   sudo npm install -g pm2
   ```

5. **โคลนโปรเจค**

   ```bash
   # ไปที่โฮมไดเร็กทอรี
   cd ~
   
   # โคลนโปรเจค
   git clone https://github.com/wdiazcarballo/flipcard-app.git
   cd flipcard-app
   ```

6. **ตั้งค่าและรัน Backend**

   ```bash
   # เข้าไปในโฟลเดอร์ backend
   cd backend
   
   # ติดตั้ง dependencies
   npm install

   # สร้างไฟล์ .env
   cat > .env << EOF
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   NODE_ENV=production
   CORS_ORIGINS=http://your-ec2-ip,http://your-domain.com
   EOF

   # ทดสอบว่า backend ทำงานได้
   node server.js
   
   # หากทำงานได้ถูกต้อง กด Ctrl+C เพื่อหยุดและรันด้วย PM2 แทน
   pm2 start server.js --name "flipcard-backend"
   pm2 save
   pm2 startup
   ```

7. **ตั้งค่าและสร้าง Frontend**

   ```bash
   # กลับไปที่โฟลเดอร์หลัก
   cd ..
   
   # เข้าไปในโฟลเดอร์ frontend
   cd frontend
   
   # ติดตั้ง dependencies
   npm install
   
   # สร้างไฟล์สำหรับตัวแปรสภาพแวดล้อม
   cat > .env.production << EOF
   REACT_APP_API_URL=http://your-ec2-ip
   EOF
   
   # สร้าง production build
   npm run build
   
   # ตรวจสอบว่ามีโฟลเดอร์ build หรือไม่
   ls -la build
   ```

8. **ตั้งค่า Nginx**

   ```bash
   # สร้าง Nginx configuration
   sudo nano /etc/nginx/sites-available/flipcard
   ```

   เพิ่มข้อมูลต่อไปนี้ในไฟล์ (แทนที่ `your-ec2-ip` ด้วย IP จริงของ EC2):

   ```nginx
   server {
       listen 80;
       server_name your-ec2-ip; # แทนที่ด้วย IP หรือโดเมนจริง

       # ส่วนของ Frontend
       location / {
           root /home/ubuntu/flipcard-app/frontend/build;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       # ส่วนของ API
       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           
           # ตั้งค่า timeout ให้เหมาะสม
           proxy_connect_timeout 300s;
           proxy_send_timeout 300s;
           proxy_read_timeout 300s;
       }

       # เพิ่มการบีบอัดข้อมูล (GZIP) เพื่อเพิ่มประสิทธิภาพ
       gzip on;
       gzip_vary on;
       gzip_min_length 10240;
       gzip_proxied expired no-cache no-store private auth;
       gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml;
       gzip_disable "MSIE [1-6]\.";
   }
   ```

9. **เปิดใช้งาน Nginx Config และตรวจสอบความถูกต้อง**

   ```bash
   # เปิดใช้งาน configuration
   sudo ln -s /etc/nginx/sites-available/flipcard /etc/nginx/sites-enabled/
   
   # ลบการตั้งค่าเริ่มต้น (ทางเลือก)
   sudo rm /etc/nginx/sites-enabled/default
   
   # ตรวจสอบความถูกต้องของการตั้งค่า
   sudo nginx -t
   
   # รีสตาร์ท Nginx
   sudo systemctl restart nginx
   ```

10. **ตรวจสอบสถานะของบริการ**

    ```bash
    # ตรวจสอบสถานะของ PM2
    pm2 status
    
    # ตรวจสอบ logs ของแอปพลิเคชัน
    pm2 logs flipcard-backend
    
    # ตรวจสอบสถานะของ Nginx
    sudo systemctl status nginx
    ```

11. **ทดสอบการเข้าถึงแอปพลิเคชัน**
    - เปิดเบราว์เซอร์และเข้าไปที่ `http://your-ec2-ip`
    - ทดสอบการลงทะเบียน เข้าสู่ระบบ และฟังก์ชันการทำงานอื่นๆ

12. **การแก้ไขปัญหาเบื้องต้น**

    **ถ้าเว็บไซต์ไม่แสดง:**
    - ตรวจสอบว่า Nginx ทำงานอยู่: `sudo systemctl status nginx`
    - ตรวจสอบ Nginx error logs: `sudo cat /var/log/nginx/error.log`
    - ตรวจสอบว่า Security Group ใน AWS เปิดพอร์ต 80 และ 443
    
    **ถ้า API ไม่ทำงาน:**
    - ตรวจสอบว่า backend ทำงานอยู่: `pm2 status`
    - ตรวจสอบ PM2 logs: `pm2 logs flipcard-backend`
    - ตรวจสอบการเชื่อมต่อกับ MongoDB
    - ตรวจสอบ CORS settings ใน backend/server.js

13. **การตั้งค่า HTTPS (ทางเลือก)**

    หากคุณมีโดเมนและต้องการใช้งาน HTTPS:
    
    ```bash
    # ติดตั้ง Certbot
    sudo apt install -y certbot python3-certbot-nginx
    
    # ขอใบรับรองและตั้งค่า HTTPS อัตโนมัติ
    sudo certbot --nginx -d yourdomain.com
    
    # ทำตามขั้นตอนที่ปรากฏบนหน้าจอ
    ```

14. **การใช้สคริปต์ติดตั้งอัตโนมัติ**

    โปรเจคนี้มีสคริปต์ `setup-ec2.sh` ที่สามารถช่วยให้การติดตั้งทั้งหมดเป็นไปโดยอัตโนมัติ:
    
    ```bash
    # อัปโหลดสคริปต์ไปยัง EC2 (จาก terminal เครื่องคุณ)
    scp -i your-key.pem setup-ec2.sh ubuntu@your-ec2-ip:~/
    
    # เชื่อมต่อกับ EC2
    ssh -i your-key.pem ubuntu@your-ec2-ip
    
    # ให้สิทธิ์ในการรันสคริปต์
    chmod +x ~/setup-ec2.sh
    
    # รันสคริปต์
    ./setup-ec2.sh
    ```
    
    สคริปต์นี้จะทำการติดตั้งทุกอย่างให้อัตโนมัติ รวมถึง:
    - ติดตั้งซอฟต์แวร์ที่จำเป็นทั้งหมด
    - ตั้งค่า Backend และ Frontend
    - ตั้งค่า Nginx
    - ตั้งค่า PM2 สำหรับการรันแอปอัตโนมัติเมื่อรีบูต
    
15. **ตั้งค่าการสำรองข้อมูลอัตโนมัติ (ทางเลือก)**

    ```bash
    # สร้างสคริปท์สำรองข้อมูล MongoDB
    mkdir -p ~/backups
    
    # สร้างสคริปท์
    cat > ~/mongodb_backup.sh << 'EOF'
    #!/bin/bash
    DATE=$(date +%Y-%m-%d_%H-%M-%S)
    BACKUP_DIR=~/backups
    mongodump --uri="your_mongodb_uri" --out=$BACKUP_DIR/mongodb_$DATE
    # คงไว้เฉพาะสำเนาย้อนหลัง 7 วัน
    find $BACKUP_DIR -type d -name "mongodb_*" -mtime +7 -exec rm -rf {} \;
    EOF
    
    # ให้สิทธิ์ในการรัน
    chmod +x ~/mongodb_backup.sh
    
    # ตั้งค่า cron job เพื่อรันทุกวัน
    (crontab -l 2>/dev/null; echo "0 0 * * * ~/mongodb_backup.sh") | crontab -
    ```

### ขั้นตอนการอัปเดตแอปพลิเคชัน

1. **อัปเดต Backend**

   ```bash
   cd ~/flipcard-app
   git pull
   cd backend
   npm install
   pm2 restart flipcard-backend
   ```

2. **อัปเดต Frontend**

   ```bash
   cd ~/flipcard-app
   git pull
   cd frontend
   npm install
   npm run build
   ```

3. **รีโหลด Nginx (ถ้าจำเป็น)**

   ```bash
   sudo systemctl reload nginx
   ```

### การติดตามและการจัดการแอปพลิเคชัน

1. **ติดตาม PM2 โดยละเอียด**

   ```bash
   # ติดตั้ง PM2 web dashboard (ทางเลือก)
   pm2 install pm2-server-monit
   
   # เปิด PM2 dashboard
   pm2 plus
   ```

2. **ดู Logs ของแอปพลิเคชัน**

   ```bash
   # ดู logs ของ backend
   pm2 logs flipcard-backend
   
   # ดู logs ของ Nginx
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

3. **การรีสตาร์ทบริการทั้งหมด**

   ```bash
   # รีสตาร์ทแอปพลิเคชัน
   pm2 restart all
   
   # รีสตาร์ท Nginx
   sudo systemctl restart nginx
   ```

### ข้อควรระวังด้านความปลอดภัย

1. **อัปเดตระบบอย่างสม่ำเสมอ**

   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **ตรวจสอบการตั้งค่าความปลอดภัย**

   ```bash
   # ตรวจสอบสถานะไฟร์วอลล์ (สำหรับการตรวจสอบเท่านั้น)
   sudo ufw status
   
   # หมายเหตุ: AWS EC2 ใช้ Security Groups แทน
   # ไฟร์วอลล์ภายใน นักศึกษาควรจัดการกฎไฟร์วอลล์ผ่าน 
   # AWS Console Security Groups แทนการใช้ ufw
   ```

3. **ตรวจสอบและจัดการการเข้าถึง SSH (ทางเลือก)**

   ```bash
   # แก้ไขการตั้งค่า SSH สำหรับความปลอดภัยที่สูงขึ้น
   sudo nano /etc/ssh/sshd_config
   ```
   
   พิจารณาปรับเปลี่ยนการตั้งค่าต่อไปนี้:
   
   ```
   PermitRootLogin no
   PasswordAuthentication no
   ```
   
   รีสตาร์ท SSH หลังจากการเปลี่ยนแปลง:
   
   ```bash
   sudo systemctl restart sshd
   ```

### ข้อมูลเพิ่มเติมเกี่ยวกับการตั้งค่า EC2 สำหรับ Web hosting

1. **การตั้งค่า Elastic IP (แนะนำ)**
   
   การตั้งค่า Elastic IP จะช่วยให้ IP address ของ EC2 instance ไม่เปลี่ยนแปลงเมื่อมีการรีสตาร์ท:
   
   - ไปที่ AWS Console > EC2 > Elastic IPs
   - คลิก "Allocate Elastic IP address"
   - เลือก Elastic IP address ที่สร้างขึ้น
   - คลิก "Actions" > "Associate Elastic IP address"
   - เลือก EC2 instance ของคุณ
   - คลิก "Associate"

2. **การใช้งาน Elastic Beanstalk (ทางเลือกสำหรับการเรียนรู้เพิ่มเติม)**
   
   AWS Elastic Beanstalk เป็นทางเลือกที่ง่ายกว่าสำหรับการ deploy แอปพลิเคชัน โดยไม่ต้องตั้งค่าเซิร์ฟเวอร์เอง
   สามารถศึกษาเพิ่มเติมได้ที่ [AWS Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)

### เคล็ดลับสำหรับนักศึกษา

1. **ค่อยๆ ทำทีละขั้น** - ทำตามคู่มือทีละขั้น ทดสอบให้แน่ใจว่าแต่ละขั้นตอนทำงานได้ก่อนที่จะไปขั้นตอนถัดไป

2. **ไม่เข้าใจให้ถาม** - หากมีข้อสงสัยหรือติดปัญหา อย่าลังเลที่จะถามอาจารย์หรือเพื่อนร่วมชั้น

3. **ลองเปลี่ยนแปลงโค้ด** - ทดลองปรับเปลี่ยนโค้ดเพื่อให้เข้าใจว่าแต่ละส่วนทำงานอย่างไร

4. **หมั่นตรวจสอบการทำงาน** - ตรวจสอบการทำงานบ่อยๆ เพื่อหาข้อผิดพลาดตั้งแต่เนิ่นๆ

5. **บันทึกสิ่งที่ได้เรียนรู้** - จดบันทึกข้อผิดพลาดที่พบและวิธีแก้ไข เพื่อเป็นประโยชน์ในอนาคต

## การสนับสนุนและการติดต่อ

หากมีคำถามหรือต้องการความช่วยเหลือ กรุณาติดต่อทีมผู้พัฒนาที่ papong@tu.ac.th

## ผู้พัฒนา

พัฒนาโดย wdiazcarballo

## ลิขสิทธิ์

ลิขสิทธิ์ © 2025 wdiazcarballo. สงวนลิขสิทธิ์
