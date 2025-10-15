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

EXPOSE 3001

# ใช้ npm start (ถ้า package.json มี start script)
# หรือแก้เป็น node server.js / node index.js ตามชื่อไฟล์จริง
CMD ["npm", "start"]

# หรือถ้ารู้ว่าไฟล์ชื่ออะไร:
# CMD ["node", "server.js"]
# CMD ["node", "index.js"]