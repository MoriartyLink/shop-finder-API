const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth-middleware');

const adminRoutes = (adminController) => {
  // All routes here are PROTECTED and require ADMIN role
  router.use(authenticateToken);

  router.get('/dashboard-stats', adminController.getStats);
  router.patch('/approve-shop/:shopId', adminController.confirmApproval);
  router.delete('/moderate-post/:postId', adminController.deletePost);

  return router;
};

module.exports = adminRoutes;