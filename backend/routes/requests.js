const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.post('/request', async (req, res) => {
  const { requester_name, department, category, description, urgency } = req.body;
  const result = await pool.query(
    'INSERT INTO it_requests (requester_name, department, category, description, urgency) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [requester_name, department, category, description, urgency]
  );
  res.json(result.rows[0]);
});

router.get('/requests', async (req, res) => {
  const result = await pool.query('SELECT * FROM it_requests ORDER BY created_at DESC');
  res.json(result.rows);
});

module.exports = router;
