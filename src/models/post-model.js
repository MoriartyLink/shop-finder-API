class PostModel {
  constructor(post, photos = []) {
    this.postId = post.post_id;
    this.userId = post.user_id;
    this.postType = post.post_type; // 'Business' or 'Consumer'
    this.content = post.content;
    this.hashtag = post.hashtag;
    this.taggedShopId = post.tagged_shop_id;
    this.createdAt = post.created_at;
    this.updatedAt = post.updated_at;
    
    // Array of PostPhotoModel instances
    this.photos = photos.map(p => ({
      photoId: p.photo_id,
      photoUrl: p.photo_url,
      uploadedAt: p.uploaded_at
    }));
  }

  toResponse() {
    return {
      postId: this.postId,
      userId: this.userId,
      postType: this.postType,
      content: this.content,
      hashtag: this.hashtag,
      taggedShopId: this.taggedShopId,
      photos: this.photos,
      createdAt: this.createdAt
    };
  }
}

module.exports = PostModel;