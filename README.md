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

**ขั้นตอนการทำ:**

1. **การทดสอบ Backend**

   - **ติดตั้งเครื่องมือทดสอบ**
   ```
   cd backend
   npm install --save-dev jest supertest
   ```

   - **เพิ่มสคริปท์ทดสอบใน package.json**
   ```json
   "scripts": {
     "test": "jest --detectOpenHandles"
   }
   ```

   - **สร้างไฟล์ทดสอบ API** (tests/auth.test.js)
   ```javascript
   const request = require('supertest');
   const app = require('../server');
   
   describe('การทดสอบ Auth API', () => {
     it('ควรแสดงข้อความต้อนรับจาก API', async () => {
       const res = await request(app).get('/');
       expect(res.statusCode).toEqual(200);
       expect(res.body).toHaveProperty('message');
     });
     
     it('ควรไม่สามารถเข้าสู่ระบบได้ด้วยข้อมูลไม่ถูกต้อง', async () => {
       const res = await request(app).post('/api/users/login').send({
         email: 'test@example.com',
         password: 'wrongpassword'
       });
       expect(res.statusCode).toEqual(401);
     });
     
     // เพิ่มการทดสอบอื่นๆ...
   });
   ```

   - **รันการทดสอบ**
   ```
   npm test
   ```

2. **การทดสอบ Frontend**

   - **เพิ่มเครื่องมือทดสอบ React**
   ```
   cd frontend
   npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
   ```

   - **สร้างไฟล์ทดสอบคอมโพเนนต์** (src/components/auth/Login.test.js)
   ```javascript
   import { render, screen, fireEvent } from '@testing-library/react';
   import Login from './Login';
   
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
   ```

   - **รันการทดสอบ**
   ```
   npm test
   ```

3. **การทดสอบ End-to-End**

   - **ติดตั้ง Cypress**
   ```
   cd frontend
   npm install --save-dev cypress
   ```

   - **เพิ่มสคริปท์รัน Cypress ใน package.json**
   ```json
   "scripts": {
     "cypress:open": "cypress open",
     "cypress:run": "cypress run"
   }
   ```

   - **สร้างไฟล์ทดสอบ E2E** (cypress/integration/login.spec.js)
   ```javascript
   describe('การทดสอบหน้าล็อกอิน', () => {
     it('ล็อกอินสำเร็จและนำไปยังหน้าแดชบอร์ด', () => {
       cy.visit('/login');
       cy.get('input[name=email]').type('test@example.com');
       cy.get('input[name=password]').type('password123');
       cy.get('button[type=submit]').click();
       
       // ตรวจสอบว่านำทางไปยังหน้าแดชบอร์ด
       cy.url().should('include', '/dashboard');
       cy.contains('ยินดีต้อนรับ').should('be.visible');
     });
   });
   ```

   - **รันการทดสอบ E2E**
   ```
   npm run cypress:open
   ```

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
   - ตั้งค่ากลุ่มความปลอดภัย (Security Group) ให้อนุญาตพอร์ต 22 (SSH), 80 (HTTP), 443 (HTTPS)
   - สร้างและดาวน์โหลดคีย์แพร์ (.pem file)
   - คลิก "Launch Instance"

3. **เชื่อมต่อกับ EC2 (Windows)**

   - ใช้ Mobaxterm เพื่อเชื่อมต่อกับ EC2 หรือ ใช้ EC2 online console

4. **เชื่อมต่อกับ EC2 (Mac/Linux)**

   ```
   chmod 400 your-key.pem
   ssh -i your-key.pem ubuntu@your-ec2-public-ip
   ```

5. **ติดตั้งซอฟต์แวร์ที่จำเป็น**

   ```
   sudo apt update && sudo apt upgrade -y
   sudo apt install -y git nginx

   # ติดตั้ง Node.js
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt install -y nodejs

   # ติดตั้ง PM2
   sudo npm install -g pm2
   ```

6. **โคลนโปรเจค**

   ```
   git clone https://github.com/wdiazcarballo/flipcard-app.git
   cd flipcard-app
   ```

7. **ตั้งค่า Backend**

   ```
   cd backend
   npm install

   # สร้างไฟล์ .env
   nano .env
   # เพิ่มตัวแปรสภาพแวดล้อมที่จำเป็น

   # เริ่มการทำงานด้วย PM2
   pm2 start server.js --name "flipcard-backend"
   pm2 save
   pm2 startup
   ```

8. **สร้าง Production Build ของ Frontend**

   ```
   cd ../frontend
   npm install
   npm run build
   ```

9. **ตั้งค่า Nginx**

   ```
   sudo nano /etc/nginx/sites-available/flipcard
   ```

   เพิ่มข้อมูลต่อไปนี้:

   ```
   server {
       listen 80;
       server_name your_ec2_ip;

       location / {
           root /home/ubuntu/flipcard-app/frontend/build;
           index index.html;
           try_files $uri $uri/ /index.html;
       }

       location /api {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

10. **เปิดใช้งาน Nginx Config**

    ```
    sudo ln -s /etc/nginx/sites-available/flipcard /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

11. **เข้าชมเว็บไซต์**
    - เปิดเบราว์เซอร์และเข้า http://your_ec2_ip

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
