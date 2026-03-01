class PostController {
  constructor(postService) {
    this.postService = postService;
  }

  getFeed = async (req, res) => {
    try {
      const posts = await this.postService.getTimelinePosts();
      res.status(200).json(posts.map(p => p.toResponse()));
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  createPost = async (req, res) => {
    try {
      // req.files would come from multer middleware
      const photoUrls = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
      const post = await this.postService.createPostWithPhotos(req.body, photoUrls);
      res.status(201).json(post.toResponse());
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

module.exports = PostController;