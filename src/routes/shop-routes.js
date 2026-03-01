const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth-middleware');
const { uploadSlip } = require('../config/multer-config');

const shopRoutes = (shopController) => {
  // Basic CRUD routes
  router.get('/', shopController.getAllShops);
  router.get('/:id', shopController.getShopById);
  router.post('/', shopController.createShop);
  router.put('/:id', shopController.updateShop);
  router.delete('/:id', shopController.deleteShop);
  
  return router;
};

module.exports = shopRoutes;