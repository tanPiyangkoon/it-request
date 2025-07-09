const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const requestRoutes = require('./routes/requests');

app.use(cors());
app.use(express.json());

// ให้ static file สำหรับรูปที่ upload
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', requestRoutes);

app.listen(3001, () => {
  console.log('Backend running at http://localhost:3001');
});
