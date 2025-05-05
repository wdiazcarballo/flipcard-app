#!/bin/bash

# สคริปต์สำหรับการตั้งค่า Flipcard App บน EC2
# สิ่งที่ต้องทำก่อนใช้งาน:
# 1. อัปโหลดไฟล์นี้ไปยัง EC2 instance
# 2. ให้สิทธิ์ในการรัน: chmod +x setup-ec2.sh
# 3. รันคำสั่ง: ./setup-ec2.sh

set -e

echo "======== เริ่มการติดตั้งแอปพลิเคชัน Flipcard บน EC2 ========="

# อัปเดตระบบ
echo "1. กำลังอัปเดตระบบ..."
sudo apt update && sudo apt upgrade -y

# ติดตั้งซอฟต์แวร์ที่จำเป็น
echo "2. กำลังติดตั้งซอฟต์แวร์ที่จำเป็น..."
sudo apt install -y git nginx

# ติดตั้ง Node.js
echo "3. กำลังติดตั้ง Node.js..."
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# ตรวจสอบ Node และ npm
echo "เวอร์ชัน Node.js: $(node --version)"
echo "เวอร์ชัน npm: $(npm --version)"

# ติดตั้ง PM2
echo "4. กำลังติดตั้ง PM2..."
sudo npm install -g pm2

# โคลนโปรเจค
echo "5. กำลังโคลนโปรเจค..."
cd ~
if [ -d "flipcard-app" ]; then
  echo "โฟลเดอร์ flipcard-app มีอยู่แล้ว, กำลังอัปเดต..."
  cd flipcard-app
  git pull
else
  echo "กำลังโคลนโปรเจค flipcard-app..."
  git clone https://github.com/wdiazcarballo/flipcard-app.git
  cd flipcard-app
fi

# ตั้งค่า Backend
echo "6. กำลังตั้งค่า Backend..."
cd backend
npm install

# ตั้งค่าไฟล์ .env (ถ้ายังไม่มี)
if [ ! -f .env ]; then
  echo "กำลังสร้างไฟล์ .env..."
  echo "PORT=5000" > .env
  echo "MONGO_URI=your_mongodb_connection_string" >> .env
  echo "JWT_SECRET=your_secure_jwt_secret" >> .env
  echo "NODE_ENV=production" >> .env
  echo "CORS_ORIGINS=http://$(curl -s http://checkip.amazonaws.com)" >> .env
  
  echo -e "\nไฟล์ .env ถูกสร้างขึ้น กรุณาแก้ไข MONGO_URI และ JWT_SECRET ด้วยค่าที่ถูกต้อง"
  echo "คุณสามารถแก้ไขด้วยคำสั่ง: nano ~/flipcard-app/backend/.env"
  read -p "กด Enter เมื่อพร้อมดำเนินการต่อ..."
fi

# ตั้งค่า PM2
echo "7. กำลังตั้งค่า PM2..."
pm2 start server.js --name "flipcard-backend"
pm2 save
pm2 startup | grep -v "pm2 save" > pm2-startup.sh
chmod +x pm2-startup.sh
sudo ./pm2-startup.sh
rm pm2-startup.sh

# ตั้งค่า Frontend
echo "8. กำลังตั้งค่า Frontend..."
cd ../frontend
npm install

# สร้างไฟล์ .env.production
echo "กำลังสร้างไฟล์ .env.production..."
PUBLIC_IP=$(curl -s http://checkip.amazonaws.com)
echo "REACT_APP_API_URL=http://$PUBLIC_IP" > .env.production

# สร้าง Production Build
echo "กำลังสร้าง Production Build..."
npm run build

# ตั้งค่า Nginx
echo "9. กำลังตั้งค่า Nginx..."
sudo tee /etc/nginx/sites-available/flipcard > /dev/null << EOF
server {
    listen 80;
    server_name $PUBLIC_IP;

    # ส่วนของ Frontend
    location / {
        root /home/ubuntu/flipcard-app/frontend/build;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }

    # ส่วนของ API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        
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
EOF

# เปิดใช้งาน Configuration
sudo ln -sf /etc/nginx/sites-available/flipcard /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# ตรวจสอบความถูกต้องของการตั้งค่า
echo "กำลังตรวจสอบการตั้งค่า Nginx..."
sudo nginx -t

# รีสตาร์ท Nginx
echo "กำลังรีสตาร์ท Nginx..."
sudo systemctl restart nginx

# ตรวจสอบสถานะของบริการ
echo "10. กำลังตรวจสอบสถานะของบริการ..."
echo -e "\nสถานะ PM2:"
pm2 status

echo -e "\nสถานะ Nginx:"
sudo systemctl status nginx --no-pager

echo -e "\n======== การติดตั้งเสร็จสมบูรณ์ ========="
echo "แอปพลิเคชัน Flipcard พร้อมใช้งานแล้วที่: http://$PUBLIC_IP"
echo -e "\nคำแนะนำเพิ่มเติม:"
echo "1. ตรวจสอบ logs ของ backend: pm2 logs flipcard-backend"
echo "2. ตรวจสอบ logs ของ Nginx: sudo tail -f /var/log/nginx/error.log"
echo "3. ตรวจสอบให้แน่ใจว่า Security Group ของ EC2 เปิดพอร์ต 80 และ 5000"
echo "4. หากคุณใช้ MongoDB Atlas ให้ตรวจสอบว่า IP ของ EC2 ได้รับอนุญาตใน Network Access"