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
