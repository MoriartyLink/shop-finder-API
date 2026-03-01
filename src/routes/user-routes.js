const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validation-middleware');
const userSchemas = require('../validators/user-validator');
const { asyncHandler } = require('../utils/helpers');

const userRoutes = (userController) => {
  // Public routes
  router.post('/register', 
    validate(userSchemas.register), 
    asyncHandler(userController.register)
  );
  
  router.post('/login', 
    validate(userSchemas.login), 
    asyncHandler(userController.login)
  );

  // Protected profile route
  router.get('/my-profile', 
    authenticateToken, 
    asyncHandler(userController.getProfile)
  );
  
  return router;
};

module.exports = userRoutes;