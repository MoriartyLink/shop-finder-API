const jwt = require('jsonwebtoken');

// 1. Basic Auth: Is the user logged in?
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ success: false, error: 'Access denied.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Contains id and role
    next();
  } catch (err) {
    return res.status(403).json({ success: false, error: 'Invalid token.' });
  }
};

// 2. Admin Guard: Is the user a Platform Admin?
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'Platform Admin') {
    return res.status(403).json({ success: false, error: 'Requires Admin Privileges.' });
  }
  next();
};

module.exports = { authenticateToken, authorizeAdmin };