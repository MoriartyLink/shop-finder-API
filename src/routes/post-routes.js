const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer-config');
const authenticateToken = require('../middlewares/auth-middleware');
const validate = require('../middlewares/validation-middleware');
const postSchemas = require('../validators/post-validator');
const { asyncHandler } = require('../utils/helpers');

const postRoutes = (postController) => {
  // Public Feed
  router.get('/post-details', 
    asyncHandler(postController.getFeed)
  );

  // Protected: Create post with multiple images
  router.post(
    '/create-post', 
    authenticateToken,
    upload.array('photos', 5), 
    validate(postSchemas.create),
    asyncHandler(postController.createPost)
  );

  return router;
};

module.exports = postRoutes;