const express = require('express');
const router = express.Router();
const pool = require('../db/pool');
const multer = require('multer');
const path = require('path');

// ตั้งค่าที่เก็บไฟล์ (upload ไปที่ ./uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Mock users for login (in real app, use DB)
const users = [
  { id: 'u001', name: 'User 1', role: 'user', password: 'user123' },
  { id: 'u002', name: 'User 2', role: 'user', password: 'user456' },
  { id: 'admin', name: 'Admin', role: 'admin', password: 'admin123' }
];

// Login endpoint (ยังใช้ mock user)
router.post('/login', (req, res) => {
  const { userId, password } = req.body;
  const found = users.find(u => u.id === userId && u.password === password);
  if (found) {
    // Don't send password back
    const { password, ...userData } = found;
    res.json({ success: true, user: userData });
  } else {
    res.status(401).json({ success: false, message: 'รหัสผ่านหรือผู้ใช้ไม่ถูกต้อง' });
  }
});

// Enable DB-backed endpoints
router.post('/request', upload.single('image'), async (req, res) => {
  try {
    const { full_name, employee_id, department, position, email, phone, description } = req.body;
    let image_url = null;
    if (req.file) {
      image_url = '/uploads/' + req.file.filename;
    }
    const result = await pool.query(
      'INSERT INTO it_requests (full_name, employee_id, department, position, email, phone, description, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [full_name, employee_id, department, position, email, phone, description, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

router.get('/requests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM it_requests ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

module.exports = router;
