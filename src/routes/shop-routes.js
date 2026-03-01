const express = require('express');
const Joi = require('joi');
const router = express.Router();
const authenticateToken = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validation-middleware');
const shopSchemas = require('../validators/shop-validator');
const { asyncHandler } = require('../utils/helpers');
const { uploadSlip } = require('../config/multer-config');

const shopRoutes = (shopController) => {
  // Basic CRUD routes
  router.get('/', 
    validate(shopSchemas.nearbySearch, 'query'), 
    asyncHandler(shopController.getAllShops)
  );
  
  router.get('/:id', 
    validate({ id: Joi.number().integer().positive().required() }, 'params'), 
    asyncHandler(shopController.getShopById)
  );
  
  router.post('/', 
    authenticateToken,
    validate(shopSchemas.create), 
    asyncHandler(shopController.createShop)
  );
  
  router.put('/:id', 
    authenticateToken,
    validate({ id: Joi.number().integer().positive().required() }, 'params'),
    validate(shopSchemas.update), 
    asyncHandler(shopController.updateShop)
  );
  
  router.delete('/:id', 
    authenticateToken,
    validate({ id: Joi.number().integer().positive().required() }, 'params'), 
    asyncHandler(shopController.deleteShop)
  );
  
  // Business Owner uploads their payment proof
  router.post('/upload-payment', 
    authenticateToken, 
    uploadSlip.single('slip'), 
    asyncHandler(shopController.submitPayment)
  );
  
  return router;
};

module.exports = shopRoutes;