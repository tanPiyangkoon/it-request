# 🔐 Security Setup Guide

## ✅ สิ่งที่แก้ไขแล้ว

### 1. Environment Variables Security
- ✅ ลบ `.env` ออกจาก git tracking
- ✅ เพิ่ม `.env` ใน `.gitignore` เพื่อป้องกันการ commit credentials
- ✅ สร้าง `.env.example` เป็น template สำหรับ setup ใหม่
- ✅ แก้ `docker-compose.yml` ให้อ่านค่าจากไฟล์ `.env`

### 2. ไฟล์ที่สร้างใหม่
```
.env                      # Environment variables สำหรับ docker-compose (ไม่ถูก commit)
.env.example              # Template สำหรับ .env
backend/.env              # Environment variables สำหรับ backend (ไม่ถูก commit)
backend/.env.example      # Template สำหรับ backend/.env
backend/uploads/.gitkeep  # ทำให้ uploads directory ถูก track โดย git
```

## 🚀 วิธีใช้งาน

### สำหรับ Developer ใหม่ที่ clone project มา:

1. **Copy template files และแก้ไขค่า**
```bash
# Copy .env.example เป็น .env
cp .env.example .env
cp backend/.env.example backend/.env

# แก้ไขค่าใน .env ให้เหมาะสมกับ environment ของคุณ
nano .env
nano backend/.env
```

2. **⚠️ IMPORTANT: เปลี่ยน passwords ก่อน deploy production!**
```bash
# ใน .env
POSTGRES_PASSWORD=your_strong_password_here

# ใน backend/.env
PGPASSWORD=your_strong_password_here
JWT_SECRET=random_string_at_least_32_characters
```

3. **Run Docker Compose**
```bash
docker-compose up -d
```

## 🔒 Docker Compose Environment Variables

`docker-compose.yml` ตอนนี้ใช้ environment variables แบบนี้:

```yaml
# Syntax: ${VARIABLE_NAME:-default_value}
POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:?Please set POSTGRES_PASSWORD in .env file}
```

**คำอธิบาย:**
- `${VAR:-default}` = ใช้ค่า default ถ้าไม่มีการกำหนด VAR
- `${VAR:?error}` = แสดง error และหยุดทำงานถ้าไม่มีการกำหนด VAR

## ⚠️ คำเตือนสำคัญ

### ❌ อย่าทำ:
- อย่า commit ไฟล์ `.env` เข้า git
- อย่าใส่ password จริงใน `docker-compose.yml`
- อย่าแชร์ไฟล์ `.env` กับคนอื่น

### ✅ ควรทำ:
- ใช้ password ที่ปลอดภัยใน production
- เปลี่ยน JWT_SECRET เป็นค่าสุ่มที่ไม่ซ้ำใคร
- ใช้ secrets management ใน production (เช่น Docker Secrets, AWS Secrets Manager)

## 🔄 การ Deploy Production

สำหรับ production แนะนำให้ใช้วิธีใดวิธีหนึ่ง:

### 1. Docker Secrets (แนะนำสำหรับ Docker Swarm)
```yaml
secrets:
  db_password:
    external: true
```

### 2. CI/CD Environment Variables
ใช้ environment variables จาก CI/CD platform:
- GitHub Actions Secrets
- GitLab CI/CD Variables
- Jenkins Credentials

### 3. Secret Management Services
- AWS Secrets Manager
- Azure Key Vault
- HashiCorp Vault

## 📝 Next Steps (ที่ยังต้องทำ)

- [ ] เพิ่ม bcrypt สำหรับ hash passwords
- [ ] เพิ่ม JWT authentication middleware
- [ ] จำกัด CORS ให้เฉพาะ allowed origins
- [ ] เพิ่ม rate limiting
- [ ] เพิ่ม input validation

## 🛠️ ตรวจสอบว่า .env ไม่ถูก track โดย git

```bash
git status

# ต้องไม่เห็น .env ใน list
# ถ้าเห็น ให้รัน:
git rm --cached .env
git rm --cached backend/.env
```

---

📌 **หมายเหตุ:** ไฟล์นี้สร้างขึ้นหลังจาก security review เพื่ออธิบายการเปลี่ยนแปลงที่ทำไป
