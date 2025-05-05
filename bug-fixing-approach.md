# แนวทางการแก้ไขบั๊กสำหรับการ Deploy บน AWS EC2

## สรุปปัญหาและการแก้ไข

เอกสารฉบับนี้สรุปวิธีการแก้ไขปัญหาการ Deploy แอปพลิเคชัน Flipcard บน AWS EC2 ที่ไม่สามารถเข้าถึงเว็บได้ โดยแสดงขั้นตอนการวิเคราะห์ปัญหาและการแก้ไขอย่างเป็นระบบ

### 1. การระบุปัญหา

จากการวิเคราะห์โค้ดต้นฉบับและข้อมูลที่ได้รับ พบปัญหาหลักที่ทำให้แอปไม่สามารถทำงานบน AWS EC2 ได้ ดังนี้:

- **การกำหนดค่า API URL**: Frontend ใช้ URL แบบ hardcoded ทำให้ไม่สามารถเชื่อมต่อกับ Backend บน EC2 ได้
- **การตั้งค่า CORS**: Backend ไม่ได้ตั้งค่า CORS ให้รองรับการเรียกข้ามโดเมน
- **การตั้งค่า Server**: Backend ทำงานบน localhost เท่านั้น ไม่ได้รับการเชื่อมต่อจากภายนอก
- **คำแนะนำการ Deploy ไม่สมบูรณ์**: README.md ไม่มีคำแนะนำที่ชัดเจนสำหรับการ Deploy บน EC2

### 2. วิธีการแก้ไข

#### 2.1 การแก้ไข Frontend

ปรับปรุงไฟล์ `frontend/src/api/axios.js` เพื่อให้กำหนดค่า API URL ได้อย่างเหมาะสมตามสภาพแวดล้อม:

```javascript
// ก่อนการแก้ไข
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// หลังการแก้ไข
const getBaseURL = () => {
  // ตรวจสอบว่าเป็นโหมด development หรือไม่
  if (process.env.NODE_ENV === 'development') {
    return '/api'; // ใช้ proxy ในโหมด development
  }

  // ใช้ตัวแปรสภาพแวดล้อมหากมีการกำหนด
  if (process.env.REACT_APP_API_URL) {
    return `${process.env.REACT_APP_API_URL}/api`;
  }

  // ใช้ window.location.origin สำหรับกรณีที่ backend และ frontend อยู่บนโดเมนเดียวกัน
  return `${window.location.origin}/api`;
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
});
```

เพิ่มการตั้งค่า Proxy ใน `frontend/package.json` สำหรับการพัฒนาในเครื่อง:

```json
"proxy": "http://localhost:5000"
```

#### 2.2 การแก้ไข Backend

ปรับปรุงไฟล์ `backend/server.js` เพื่อรองรับการเรียกข้ามโดเมนและรับการเชื่อมต่อจากทุกอินเทอร์เฟส:

```javascript
// ก่อนการแก้ไข
app.use(cors());

// หลังการแก้ไข
const corsOptions = {
  origin: function (origin, callback) {
    // ตรวจสอบว่ามีการกำหนด CORS_ORIGINS ในตัวแปรสภาพแวดล้อมหรือไม่
    const allowedOrigins = process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : ['http://localhost:3000']; // ค่าเริ่มต้นสำหรับการพัฒนา

    // อนุญาตให้ไม่มี origin (เช่น คำขอจาก Postman หรือเครื่องมือทดสอบ)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

ปรับปรุงการเริ่มเซิร์ฟเวอร์เพื่อรับการเชื่อมต่อจากทุกอินเทอร์เฟส:

```javascript
// ก่อนการแก้ไข
app.listen(PORT, () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่พอร์ต ${PORT} ในโหมด ${process.env.NODE_ENV}`);
});

// หลังการแก้ไข
app.listen(PORT, '0.0.0.0', () => {
  console.log(`เซิร์ฟเวอร์กำลังทำงานที่พอร์ต ${PORT} ในโหมด ${process.env.NODE_ENV}`);
});
```

#### 2.3 การตั้งค่า Nginx

สร้างไฟล์ `nginx-flipcard.conf` สำหรับการตั้งค่า Nginx บน EC2:

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

#### 2.4 การสร้างสคริปต์ตั้งค่าอัตโนมัติ

สร้างไฟล์ `setup-ec2.sh` เพื่อทำการติดตั้งและตั้งค่าทั้งหมดโดยอัตโนมัติ:

```bash
#!/bin/bash
# สคริปต์สำหรับการตั้งค่า Flipcard App บน EC2
# สิ่งที่ต้องทำก่อนใช้งาน:
# 1. อัปโหลดไฟล์นี้ไปยัง EC2 instance
# 2. ให้สิทธิ์ในการรัน: chmod +x setup-ec2.sh
# 3. รันคำสั่ง: ./setup-ec2.sh

set -e

# 1. อัปเดตแพ็กเกจและติดตั้งซอฟต์แวร์ที่จำเป็น
echo "1. กำลังอัปเดตและติดตั้งซอฟต์แวร์ที่จำเป็น..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y git nginx

# ติดตั้ง Node.js
echo "2. กำลังติดตั้ง Node.js..."
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# ตรวจสอบการติดตั้ง
node --version
npm --version

# ติดตั้ง PM2
echo "3. กำลังติดตั้ง PM2..."
sudo npm install -g pm2

# 2. โคลนโปรเจค
echo "4. กำลังโคลนโปรเจค..."
cd ~
git clone https://github.com/wdiazcarballo/flipcard-app.git
cd flipcard-app

# 3. ตั้งค่า Backend
echo "5. กำลังตั้งค่า Backend..."
cd backend
npm install

# สร้างไฟล์ .env
echo "กรุณาป้อนข้อมูลต่อไปนี้สำหรับไฟล์ .env:"
read -p "MongoDB URI: " mongo_uri
read -p "JWT Secret (หรือกด Enter เพื่อใช้ค่าเริ่มต้น): " jwt_secret
jwt_secret=${jwt_secret:-"your_secure_jwt_secret"}
read -p "EC2 IP หรือโดเมนของคุณ: " ec2_ip

# สร้างไฟล์ .env
cat > .env << EOF
PORT=5000
MONGO_URI=${mongo_uri}
JWT_SECRET=${jwt_secret}
NODE_ENV=production
CORS_ORIGINS=http://${ec2_ip},https://${ec2_ip}
EOF

# ทดสอบและเริ่ม backend ด้วย PM2
echo "6. กำลังเริ่ม Backend ด้วย PM2..."
pm2 start server.js --name "flipcard-backend"
pm2 save
pm2 startup

# 4. ตั้งค่า Frontend
echo "7. กำลังตั้งค่า Frontend..."
cd ../frontend
npm install

# สร้างไฟล์ .env.production
cat > .env.production << EOF
REACT_APP_API_URL=http://${ec2_ip}
EOF

# สร้าง production build
echo "8. กำลังสร้าง Frontend production build..."
npm run build

# 5. ตั้งค่า Nginx
echo "9. กำลังตั้งค่า Nginx..."
sudo tee /etc/nginx/sites-available/flipcard > /dev/null << EOF
server {
    listen 80;
    server_name ${ec2_ip};

    # Frontend
    location / {
        root /home/ubuntu/flipcard-app/frontend/build;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 300s;
        proxy_send_timeout 300s;
        proxy_read_timeout 300s;
    }

    # GZIP
    gzip on;
    gzip_vary on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";
}
EOF

# เปิดใช้งาน configuration
sudo ln -s /etc/nginx/sites-available/flipcard /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

echo "=========================="
echo "การติดตั้งเสร็จสมบูรณ์!"
echo "=========================="
echo "IP ของคุณ: ${ec2_ip}"
echo "เข้าชมเว็บไซต์ได้ที่: http://${ec2_ip}"
echo ""
echo "คำสั่งที่มีประโยชน์:"
echo "- ดู backend logs: pm2 logs flipcard-backend"
echo "- ดู nginx logs: sudo tail -f /var/log/nginx/error.log"
echo "- รีสตาร์ท backend: pm2 restart flipcard-backend"
echo "- รีสตาร์ท nginx: sudo systemctl restart nginx"
```

### 3. การแก้ไขการทดสอบ Frontend

ปัญหาที่พบในส่วนการทดสอบ Frontend คือการไม่สามารถหาโมดูล 'react-router-dom' ได้ ซึ่งแก้ไขโดย:

1. สร้างโฟลเดอร์ `frontend/src/mocks` เพื่อเก็บ mock modules
2. สร้างไฟล์ `frontend/src/mocks/react-router-dom.js` เพื่อจำลอง react-router-dom
3. สร้างไฟล์ `frontend/src/mocks/AuthContext.js` เพื่อจำลอง AuthContext
4. ปรับปรุงไฟล์ `frontend/src/setupTests.js` เพื่อตั้งค่าสภาพแวดล้อมการทดสอบ
5. ปรับปรุงไฟล์ทดสอบให้ใช้ mock modules ที่สร้างขึ้น

### 4. การปรับปรุง README.md

ปรับปรุง README.md ให้มีคำแนะนำที่ชัดเจนเกี่ยวกับ:
- ขั้นตอนการ Deploy บน AWS EC2 อย่างละเอียด
- วิธีการใช้สคริปต์ตั้งค่าอัตโนมัติ
- การตั้งค่า Nginx สำหรับการ Proxy
- การแก้ไขปัญหาที่อาจเกิดขึ้น
- คำแนะนำเกี่ยวกับการทดสอบ Frontend, Backend และ End-to-End

## แนวทางการแก้ไขปัญหาที่เป็นระบบ

จากการแก้ไขปัญหาข้างต้น เราสามารถสรุปแนวทางการแก้ไขปัญหาที่เป็นระบบได้ดังนี้:

1. **วิเคราะห์ปัญหา**: ตรวจสอบโค้ดและข้อมูลเพื่อระบุสาเหตุของปัญหา
2. **วางแผนการแก้ไข**: สร้างรายการสิ่งที่ต้องแก้ไขเป็นขั้นตอน
3. **แก้ไขทีละส่วน**: แก้ไขปัญหาทีละส่วนและทดสอบการทำงานทุกครั้ง
4. **เขียนสคริปต์อัตโนมัติ**: สร้างสคริปต์เพื่อให้การตั้งค่าในอนาคตทำได้ง่ายขึ้น
5. **ปรับปรุงเอกสาร**: แก้ไขเอกสารให้มีข้อมูลที่ถูกต้องและครบถ้วน
6. **ทดสอบโดยรวม**: ทดสอบระบบทั้งหมดเพื่อให้แน่ใจว่าทำงานได้ตามที่ต้องการ

## ข้อควรระวังสำหรับการ Deploy บน AWS EC2

1. **Security Group**: อย่าลืมตั้งค่า Security Group ให้เปิดพอร์ตที่จำเป็น (22, 80, 443, 5000)
2. **การจัดการไฟร์วอลล์**: ให้ใช้ Security Group ของ AWS แทนการตั้งค่า ufw บนเครื่อง EC2
3. **ตัวแปรสภาพแวดล้อม**: ตรวจสอบว่าได้ตั้งค่าตัวแปรสภาพแวดล้อมทั้งหมดอย่างถูกต้อง
4. **การตั้งค่า CORS**: ตรวจสอบว่าได้ตั้งค่า CORS ให้ถูกต้องสำหรับ Production
5. **การตรวจสอบ Logs**: หากมีปัญหา ให้ตรวจสอบ Logs ของ Nginx และ PM2

## เครื่องมือและเทคนิคที่ใช้

1. **PM2**: จัดการกระบวนการ Node.js ในสภาพแวดล้อมการผลิต
2. **Nginx**: ใช้เป็น Reverse Proxy เพื่อจัดการการเข้าถึง Frontend และ Backend
3. **Environment Variables**: ใช้ตัวแปรสภาพแวดล้อมเพื่อกำหนดค่าตามสภาพแวดล้อม
4. **Jest**: ใช้สำหรับการทดสอบอัตโนมัติ
5. **Bash Script**: สร้างสคริปต์อัตโนมัติเพื่อทำให้การตั้งค่าง่ายขึ้น
