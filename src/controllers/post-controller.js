const { successResponse, errorResponse, asyncHandler } = require('../utils/helpers');

class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  getFeed = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const posts = await this.postService.getTimelinePosts();
    
    res.status(200).json(
      successResponse(
        posts.map(p => p.toResponse()), 
        'Posts retrieved successfully'
      )
    );
  });

  createPost = asyncHandler(async (req, res) => {
    // req.files would come from multer middleware
    const photoUrls = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const postData = { ...req.body, user_id: req.user.id };
    const post = await this.postService.createPostWithPhotos(postData, photoUrls);
    
    res.status(201).json(
      successResponse(post.toResponse(), 'Post created successfully')
    );
  });
}

module.exports = PostController;