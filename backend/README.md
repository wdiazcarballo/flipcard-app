# Flipcard แอปพลิเคชัน - Backend

ส่วน Backend ของแอปพลิเคชัน Flipcard พัฒนาด้วย Node.js และ Express.js สำหรับให้บริการ API ที่จำเป็นในการจัดการบัตรคำศัพท์ดิจิทัล

## ภาพรวม

ส่วน Backend นี้ทำหน้าที่เป็น RESTful API ที่จัดการข้อมูลผู้ใช้ หมวดหมู่ และบัตรคำ โดยมีฟีเจอร์หลักดังนี้:

- **การยืนยันตัวตน**: ลงทะเบียน เข้าสู่ระบบ และรับข้อมูลผู้ใช้
- **การจัดการหมวดหมู่**: สร้าง อ่าน อัปเดต และลบหมวดหมู่
- **การจัดการบัตรคำ**: สร้าง อ่าน อัปเดต และลบบัตรคำในแต่ละหมวดหมู่
- **การรักษาความปลอดภัย**: การตรวจสอบสิทธิ์ด้วย JWT และการรักษาความปลอดภัยที่เข้มงวด

## โครงสร้างโปรเจค

```
backend/
├── config/               # การตั้งค่าการเชื่อมต่อฐานข้อมูลและองค์ประกอบอื่นๆ
│   └── db.js             # การเชื่อมต่อกับ MongoDB
├── controllers/          # ตัวควบคุมสำหรับจัดการลอจิกทางธุรกิจ
│   ├── cardController.js # การจัดการบัตรคำ
│   ├── categoryController.js # การจัดการหมวดหมู่
│   └── userController.js # การจัดการผู้ใช้
├── middleware/           # Middleware สำหรับการตรวจสอบและประมวลผลคำขอ
│   ├── auth.js           # การตรวจสอบสิทธิ์ด้วย JWT
│   ├── error.js          # การจัดการข้อผิดพลาด
│   └── rateLimiter.js    # การจำกัดอัตราการส่งคำขอ
├── models/               # โมเดลข้อมูล Mongoose
│   ├── Card.js           # โมเดลบัตรคำ
│   ├── Category.js       # โมเดลหมวดหมู่
│   └── User.js           # โมเดลผู้ใช้
├── routes/               # เส้นทาง API
│   ├── cardRoutes.js     # เส้นทางสำหรับบัตรคำ
│   ├── categoryRoutes.js # เส้นทางสำหรับหมวดหมู่
│   └── userRoutes.js     # เส้นทางสำหรับผู้ใช้
├── utils/                # ยูทิลิตี้และฟังก์ชันช่วยเหลือ
│   └── generateToken.js  # การสร้าง JWT
├── server.js             # ไฟล์หลักสำหรับเริ่มเซิร์ฟเวอร์
├── .env                  # ตัวแปรสภาพแวดล้อม (ไม่ถูกเก็บใน Git)
└── package.json          # การกำหนดค่าโปรเจค npm
```

## แผนผังการเชื่อมต่อและเส้นทาง (Routes Diagram)

แผนผังต่อไปนี้แสดงถึงการเชื่อมต่อระหว่างองค์ประกอบต่างๆ และการทำงานของเส้นทาง (routes) ในแอปพลิเคชัน:

```
                      +-----------------+
                      |                 |
                      |    server.js    |
                      |                 |
                      +-------+---------+
                              |
                              | (configures)
                              v
+------------------------+    |    +----------------------+    +-----------------------+
|                        |    |    |                      |    |                       |
| Global Middleware      |<---+---->  Routes              |    | Database Connection   |
| - helmet               |    |    |  - userRoutes.js     |<-->| config/db.js          |
| - cors                 |    |    |  - categoryRoutes.js |    | (MongoDB/Mongoose)    |
| - rateLimiter.js       |    |    |  - cardRoutes.js     |    |                       |
| - express.json         |    |    |                      |    +-----------------------+
|                        |    |    +----------+-----------+
+------------------------+             |      |
                                      |      |
                         +------------+      +------------+
                         |                                |
                         v                                v
          +--------------+----------------+  +-----------+------------------+
          |                               |  |                              |
          |  User Routes                  |  |  Resource Routes             |
          |  /api/users/register          |  |  - /api/categories          |
          |  /api/users/login             |  |  - /api/categories/:id      |
          |  /api/users/me                |  |  - /api/categories/:id/cards|
          |                               |  |  - /api/cards/:id            |
          +---------------+---------------+  +------------+----------------+
                          |                                |
          +---------------v---------------+  +------------v----------------+
          |                               |  |                             |
          |  User Controllers             |  |  Resource Controllers       |
          |  - registerUser()             |  |  - createCategory()         |
          |  - loginUser()                |  |  - getCategories()          |
          |  - getUserProfile()           |  |  - updateCategory()         |
          |                               |  |  - deleteCategory()         |
          |                               |  |  - createCard()             |
          |                               |  |  - getCards()               |
          |                               |  |  - updateCard()             |
          +---------------+---------------+  |  - deleteCard()             |
                          |                  |                             |
                          |                  +-------------+---------------+
                          |                                |
                          v                                v
          +---------------+----------------------------------+---------------+
          |                                                                  |
          |  Middleware                                                      |
          |  - auth.js (protect middleware for authenticated routes)         |
          |  - Express Validator (input validation)                          |
          |  - Error handling                                                |
          |                                                                  |
          +----------------------------+-----------------------------------+-+
                                       |                                   |
                                       v                                   v
                         +-------------+------------+        +-------------+-----------+
                         |                          |        |                         |
                         |  Models                  |        |  Utils                  |
                         |  - User.js               |        |  - generateToken.js     |
                         |  - Category.js           |        |  - Other utilities      |
                         |  - Card.js               |        |                         |
                         |                          |        |                         |
                         +--------------------------+        +-------------------------+
```

แผนผังนี้แสดงโครงสร้างและความสัมพันธ์ต่างๆ:

- **server.js** เป็นจุดเริ่มต้นที่กำหนดค่า Express server, middleware, และเส้นทาง
- **Routes** กำหนดเส้นทาง API และเชื่อมต่อไปยัง controllers ที่เหมาะสม
- **Controllers** ประกอบด้วยลอจิกทางธุรกิจและการจัดการข้อมูล
- **Middleware** ตรวจสอบและประมวลผลคำขอก่อนที่จะถึง controllers
- **Models** กำหนดโครงสร้างข้อมูลและวิธีการเข้าถึงฐานข้อมูล
- **Utils** มีฟังก์ชันช่วยเหลือต่างๆ เช่น การสร้าง JWT

### การไหลของข้อมูล (Data Flow)

1. **HTTP Request → Express Server**: คำขอเข้ามาที่เซิร์ฟเวอร์ Express
2. **Express → Global Middleware**: คำขอผ่านการตรวจสอบโดย middleware ทั่วไป
3. **Middleware → Routes**: เป็นตัวเชื่อมเส้นทาง กับ route handler
4. **Routes → Route-specific Middleware**: middleware เฉพาะสำหรับเส้นทางนั้นๆ (เช่น การตรวจสอบสิทธิ์)
5. **Middleware → Controllers**: controller ที่ออกแบบไว้สำหรับประมวลผลคำขอแต่ละประเภท
6. **Controllers → Models**: controllers เรียกใช้ models เพื่อจัดการข้อมูลในฐานข้อมูล
7. **Models → Database**: การเข้าถึงและจัดการข้อมูลใน MongoDB

8. **Database → Client**: ผลลัพธ์ถูกส่งกลับไปยังไคลเอนต์

## API Endpoints

### ผู้ใช้ (Users)

| Endpoint              | Method | Description             | Authentication Required |
| --------------------- | ------ | ----------------------- | ----------------------- |
| `/api/users/register` | POST   | ลงทะเบียนผู้ใช้ใหม่     | No                      |
| `/api/users/login`    | POST   | เข้าสู่ระบบผู้ใช้       | No                      |
| `/api/users/me`       | GET    | รับข้อมูลผู้ใช้ปัจจุบัน | Yes                     |

### หมวดหมู่ (Categories)

| Endpoint              | Method | Description              | Authentication Required |
| --------------------- | ------ | ------------------------ | ----------------------- |
| `/api/categories`     | POST   | สร้างหมวดหมู่ใหม่        | Yes                     |
| `/api/categories`     | GET    | รับรายการหมวดหมู่ทั้งหมด | Yes                     |
| `/api/categories/:id` | GET    | รับหมวดหมู่ตาม ID        | Yes                     |
| `/api/categories/:id` | PUT    | อัปเดตหมวดหมู่           | Yes                     |
| `/api/categories/:id` | DELETE | ลบหมวดหมู่               | Yes                     |

### บัตรคำ (Cards)

| Endpoint                            | Method | Description               | Authentication Required |
| ----------------------------------- | ------ | ------------------------- | ----------------------- |
| `/api/categories/:categoryId/cards` | POST   | สร้างบัตรคำใหม่ในหมวดหมู่ | Yes                     |
| `/api/categories/:categoryId/cards` | GET    | รับรายการบัตรคำในหมวดหมู่ | Yes                     |
| `/api/cards/:id`                    | GET    | รับบัตรคำตาม ID           | Yes                     |
| `/api/cards/:id`                    | PUT    | อัปเดตบัตรคำ              | Yes                     |
| `/api/cards/:id`                    | DELETE | ลบบัตรคำ                  | Yes                     |

## การติดตั้ง

1. ต้องมี Node.js และ npm ติดตั้งในเครื่อง
2. ติดตั้ง dependencies:

```bash
npm install
```

3. ตั้งค่าตัวแปรสภาพแวดล้อมในไฟล์ `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## การรันแอปพลิเคชัน

### โหมดพัฒนา

```bash
npm run dev
```

เซิร์ฟเวอร์จะทำงานบนพอร์ต 5000 โดยค่าเริ่มต้น: [http://localhost:5000](http://localhost:5000)

### โหมด Production

```bash
npm start
```

## การทดสอบ

```bash
npm test
```

## การ Dockerize

เราสามารถสร้างคอนเทนเนอร์ Docker สำหรับ Backend ได้ด้วยคำสั่งต่อไปนี้:

```bash
# สร้าง Docker image
docker build -t flipcard-backend .

# รันคอนเทนเนอร์
docker run -p 5000:5000 --env-file .env flipcard-backend
```

## ความปลอดภัย

Backend ใช้มาตรการความปลอดภัยต่างๆ:

- **JWT Authentication**: การตรวจสอบสิทธิ์ด้วย JSON Web Tokens
- **Password Hashing**: การแฮชรหัสผ่านด้วย bcryptjs
- **Input Validation**: การตรวจสอบข้อมูลนำเข้าด้วย express-validator
- **Rate Limiting**: การจำกัดจำนวนคำขอด้วย express-rate-limit
- **Security Headers**: การตั้งค่าส่วนหัวความปลอดภัยด้วย helmet
- **CORS**: การจัดการการเข้าถึงทรัพยากรข้ามโดเมน

## สำหรับนักศึกษา

นี่เป็นโปรเจคสำหรับการเรียนรู้การพัฒนา Backend ด้วย Node.js และ Express.js โดยเน้นที่:

- **RESTful API Design**: การออกแบบ API ที่ดีตามหลัก REST
- **Authentication & Authorization**: การยืนยันตัวตนและการจัดการสิทธิ์
- **Database Integration**: การเชื่อมต่อและจัดการข้อมูลใน MongoDB
- **Middleware Pattern**: การใช้ middleware ในการประมวลผลคำขอ
- **Error Handling**: การจัดการข้อผิดพลาดอย่างเหมาะสม
- **Security Best Practices**: การใช้แนวปฏิบัติที่ดีที่สุดด้านความปลอดภัย

นักศึกษาสามารถเรียนรู้เพิ่มเติมโดยศึกษาโค้ดและทดลองเพิ่มฟีเจอร์ใหม่ เช่น:

- การเพิ่มระบบบันทึกกิจกรรม (Activity Logging)
- การเพิ่มการค้นหาและการกรองข้อมูล
- การเพิ่มระบบแคช (Caching) เพื่อปรับปรุงประสิทธิภาพ
