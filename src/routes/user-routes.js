const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth-middleware');

const userRoutes = (userController) => {
  // Public routes
  router.post('/register', userController.register);
  router.post('/login', userController.login);

  // Protected profile route
  router.get('/my-profile', authenticateToken, userController.getProfile);
  
  return router;
};

module.exports = userRoutes;