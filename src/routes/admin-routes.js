const express = require('express');
const Joi = require('joi');
const router = express.Router();
const authenticateToken = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validation-middleware');
const { asyncHandler } = require('../utils/helpers');

const adminRoutes = (adminController) => {
  // All routes here are PROTECTED and require ADMIN role
  router.use(authenticateToken);

  router.get('/dashboard-stats', 
    asyncHandler(adminController.getStats)
  );
  
  router.patch('/approve-shop/:shopId', 
    validate({ shopId: Joi.number().integer().positive().required() }, 'params'),
    asyncHandler(adminController.confirmApproval)
  );
  
  router.delete('/moderate-post/:postId', 
    validate({ postId: Joi.number().integer().positive().required() }, 'params'),
    asyncHandler(adminController.deletePost)
  );

  return router;
};

module.exports = adminRoutes;