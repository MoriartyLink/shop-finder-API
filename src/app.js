const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const masterRouter = require('./routes/index');
const errorHandler = require('./middlewares/error-middleware');
const requestLogger = require('./middlewares/request-logger');
const { generalLimiter, authLimiter, uploadLimiter } = require('./middlewares/rate-limiter');

const app = express();

// Middleware
app.use(requestLogger);
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Rate limiting
app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);
app.use('/api/posts/create-post', uploadLimiter);

// API routes
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

// Error handling middleware (must be last)
app.use(errorHandler);

module.exports = app;