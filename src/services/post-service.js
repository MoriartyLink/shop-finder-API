const PostModel = require('../models/post-model');

class PostService {
  constructor(pool) {
    this.pool = pool;
  }

  async getTimelinePosts() {
    // Fetches posts with their associated photos using a JSON aggregation
    const query = `
      SELECT p.*, 
             COALESCE(json_agg(ph.*) FILTER (WHERE ph.photo_id IS NOT NULL), '[]') as photos
      FROM public.posts p
      LEFT JOIN public.post_photo ph ON p.post_id = ph.post_id
      GROUP BY p.post_id
      ORDER BY p.created_at DESC`;
    
    const { rows } = await this.pool.query(query);
    return rows.map(row => new PostModel(row, row.photos));
  }

  async createPostWithPhotos(postData, photoUrls) {
    const { userId, postType, content, hashtag, taggedShopId } = postData;
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');
      
      const postQuery = `
        INSERT INTO public.posts (user_id, post_type, content, hashtag, tagged_shop_id, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`;
      const postRes = await client.query(postQuery, [userId, postType, content, hashtag, taggedShopId]);
      const newPost = postRes.rows[0];

      const photoRows = [];
      for (const url of photoUrls) {
        const photoRes = await client.query(
          'INSERT INTO public.post_photo (post_id, photo_url, uploaded_at) VALUES ($1, $2, NOW()) RETURNING *',
          [newPost.post_id, url]
        );
        photoRows.push(photoRes.rows[0]);
      }

      await client.query('COMMIT');
      return new PostModel(newPost, photoRows);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

module.exports = PostService;