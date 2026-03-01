const express = require('express');
const router = express.Router();
const { upload } = require('../config/multer-config');
const authenticateToken = require('../middlewares/auth-middleware');

const postRoutes = (postController) => {
  // Public Feed
  router.get('/post-details', postController.getFeed);

  // Protected: Create post with multiple images
  // 'photos' is the field name used in the FormData from React Native
  router.post(
    '/create-post', 
    authenticateToken, 
    upload.array('photos', 5), 
    postController.createPost
  );

  return router;
};

module.exports = postRoutes;