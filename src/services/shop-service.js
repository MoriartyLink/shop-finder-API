const ShopModel = require('../models/shop-model');

class ShopService {
  constructor(pool) {
    this.pool = pool;
  }

  async getActiveShops() {
    const query = `
      SELECT * FROM shop_service 
WHERE latest_paid_date >= NOW() - INTERVAL '30 days';
    `;
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getAllShops() {
    const query = 'SELECT * FROM public.shop_service ORDER BY name ASC';
    const { rows } = await this.pool.query(query);
    return rows.map(row => new ShopModel(row));
  }

  async getNearbyShops(lat, lon, distanceMeters = 5000) {
    // Using PostGIS to find shops within a radius
    const query = `
      SELECT *, 
      ST_Distance(location, ST_SetSRID(ST_MakePoint($1, $2), 4326)) as distance
      FROM public.shop_service
      WHERE ST_DWithin(location, ST_SetSRID(ST_MakePoint($1, $2), 4326), $3)
      ORDER BY distance ASC`;
    
    const { rows } = await this.pool.query(query, [lon, lat, distanceMeters]);
    return rows.map(row => new ShopModel(row));
  }
}

module.exports = ShopService;