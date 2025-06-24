const express = require('express');
const cors = require('cors');
const app = express();
const requestRoutes = require('./routes/requests');

app.use(cors());
app.use(express.json());

app.use('/api', requestRoutes);

app.listen(3001, () => {
  console.log('Backend running at http://localhost:3001');
});
