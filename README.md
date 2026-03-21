# 🐳 WEEK6 - N-Tier Architecture with Docker

โปรเจกต์นี้เป็นการพัฒนาแอปพลิเคชันโดยใช้แนวคิด **N-Tier Architecture** ร่วมกับ **Docker**  
เพื่อให้ระบบสามารถแยกส่วน (Layer) และ deploy ได้ง่ายขึ้น

---

## 📌 แนวคิดหลักของโปรเจกต์

โปรเจกต์นี้ใช้ **N-Tier Architecture** ซึ่งแบ่งระบบออกเป็นหลายชั้น เช่น

- 🌐 Presentation Layer (Frontend / API)
- ⚙️ Business Logic Layer (Service)
- 🗄️ Data Access Layer (Database)

และใช้ **Docker + Docker Compose** เพื่อจัดการหลาย service พร้อมกัน  
ซึ่งช่วยให้ระบบสามารถรันได้ง่าย และ portable มากขึ้น  [oai_citation:0‡GitHub](https://github.com/docker-archive/modernizing_apps_for_java_devs?utm_source=chatgpt.com)

---

## 🧱 โครงสร้างระบบ (Architecture)

ตัวอย่าง service ที่อยู่ในระบบ:

- Web / API Service
- Database (เช่น MySQL)
- อาจมี Service อื่น ๆ (เช่น Worker หรือ Microservice)

Docker จะช่วยให้แต่ละส่วนรันแยก container และเชื่อมกันผ่าน network

---

## 👥 สมาชิกในทีม

- นายเบญจครายุทธ น้อยอุบล  
- นายชนะสรณ์ บุตรถา  
- นายธาวัน ทิพคุณ  
- นายอดิ โรจน์ กุหลั่น  

---

## 🚀 วิธีใช้งานโปรเจกต์

### 1. Clone Repository
```bash
git clone https://github.com/Benjasarayut/WEEK6-NTIER-DOCKER.git
```

### 2. เข้าไปที่โฟลเดอร์โปรเจกต์
```bash
cd WEEK6-NTIER-DOCKER
```

### 3. รันระบบด้วย Docker
```bash
docker-compose up --build
```

### 4. เข้าใช้งานระบบ
เปิด browser ไปที่:
```
http://localhost:8080
```

(หรือ port อื่นตามที่ตั้งค่าใน docker-compose)

---

## 🛠️ เทคโนโลยีที่ใช้

- Docker 🐳
- Docker Compose
- N-Tier Architecture
- Backend Framework (เช่น Spring Boot / Node.js)
- Database (เช่น MySQL)

---

## 📦 จุดเด่นของโปรเจกต์

- แยก Layer ชัดเจน (Maintain ง่าย)
- ใช้ Docker ทำให้ Deploy ง่าย
- รองรับการขยายระบบ (Scalable)
- ทำงานแบบ Multi-container

---

## 📖 สิ่งที่ได้เรียนรู้

- การออกแบบระบบแบบ N-Tier
- การใช้ Docker ในการจัดการหลาย Service
- การเชื่อมต่อระหว่าง Container
- การทำงานเป็นทีมผ่าน GitHub

---

## 📎 Repository
https://github.com/Benjasarayut/WEEK6-NTIER-DOCKER.git
