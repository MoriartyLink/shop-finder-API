const express = require('express');
const router = express.Router();

// Modules
const userRoutes = require('./user-routes');
const shopRoutes = require('./shop-routes');
const postRoutes = require('./post-routes');
const adminRoutes = require('./admin-routes');

// Services
const AuthService = require('../services/auth-service');
const ShopService = require('../services/shop-service');
const PostService = require('../services/post-service');
const AdminService = require('../services/admin-service');

// Controllers
const AuthController = require('../controllers/auth-controller');
const ShopController = require('../controllers/shop-controller');
const PostController = require('../controllers/post-controller');
const AdminController = require('../controllers/admin-controller');

const masterRouter = (pool) => {
  const authService = new AuthService(pool);
  const shopService = new ShopService(pool);
  const postService = new PostService(pool);
  const adminService = new AdminService(pool);

  const authController = new AuthController(authService);
  const shopController = new ShopController(shopService);
  const postController = new PostController(postService);
  const adminController = new AdminController(adminService);

  // Prefixing based on your naming convention /api/v1/...
  router.use('/auth', userRoutes(authController));
  router.use('/shops', shopRoutes(shopController));
  router.use('/posts', postRoutes(postController));
  router.use('/admin', adminRoutes(adminController));

  return router;
};

module.exports = masterRouter;