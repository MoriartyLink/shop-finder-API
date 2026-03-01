class AdminService {
  constructor(pool) {
    this.pool = pool;
  }

  // 1. Fetch shops that have sent a slip but haven't been updated recently
  async getPendingPayments() {
    const query = `
      SELECT shop_id, name, payment_slip_url, latest_paid_date 
      FROM public.shop_service 
      WHERE payment_slip_url IS NOT NULL 
      AND (latest_paid_date IS NULL OR latest_paid_date < NOW() - INTERVAL '30 days')
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  // 2. Approve: Set the payment date to NOW()
  async approvePayment(shopId) {
    const query = `
      UPDATE public.shop_service 
      SET latest_paid_date = NOW() 
      WHERE shop_id = $1 
      RETURNING *
    `;
    const result = await this.pool.query(query, [shopId]);
    return result.rows[0];
  }

  async getPlatformStats() {
    const userCount = await this.pool.query('SELECT COUNT(*) FROM public.user');
    const shopCount = await this.pool.query('SELECT COUNT(*) FROM public.shop_service');
    return { 
      totalUsers: userCount.rows[0].count, 
      totalShops: shopCount.rows[0].count 
    };
  }
}

module.exports = AdminService;