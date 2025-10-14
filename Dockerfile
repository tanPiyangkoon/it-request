# ----- deps -----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN corepack enable || true && npm ci

# ----- runtime -----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ถ้ามีสคริปต์ build จะรันเองใน Jenkins อยู่แล้ว; ไม่มี ก็ข้ามได้
# CMD จะเลือกอัตโนมัติ:
#  - ถ้ามี "npm start" -> ใช้มัน
#  - ถ้าไม่มี -> รันไฟล์ Node ทั่วไป (index.js / server.js) ถ้าคุณตั้งชื่อไฟล์ต่างออกไปให้แก้เอง
CMD [ "sh", "-c", "if npm run | grep -q \" start\"; then npm start; elif [ -f server.js ]; then node server.js; elif [ -f index.js ]; then node index.js; else echo 'No start script or entry file found.'; exit 1; fi" ]
