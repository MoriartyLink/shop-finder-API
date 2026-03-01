const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const masterRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Inject the pool into the master router
app.use('/api', masterRouter(pool));

// Temporary test endpoint without database
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

app.post('/api/test-login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    res.json({ 
      success: true, 
      token: 'test-token-123',
      user: { id: 1, username: 'testuser', email }
    });
  } else {
    res.status(400).json({ success: false, error: 'Email and password required' });
  }
});

module.exports = app;