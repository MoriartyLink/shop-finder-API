const { successResponse, errorResponse, asyncHandler } = require('../utils/helpers');

class ShopController {
  constructor(shopService) {
    this.shopService = shopService;
  }

  getAllShops = asyncHandler(async (req, res) => {
    const { lat, lon, radius = 5000, page = 1, limit = 10 } = req.query;
    
    let shops;
    if (lat && lon) {
      shops = await this.shopService.getNearbyShops(
        parseFloat(lat), 
        parseFloat(lon), 
        parseInt(radius)
      );
    } else {
      shops = await this.shopService.getAllShops();
    }
    
    res.status(200).json(
      successResponse(shops, 'Shops retrieved successfully')
    );
  });

  getShopById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const shop = await this.shopService.getShopById(id);
    
    if (!shop) {
      return res.status(404).json(
        errorResponse('Shop not found', 404)
      );
    }
    
    res.status(200).json(
      successResponse(shop, 'Shop retrieved successfully')
    );
  });

  createShop = asyncHandler(async (req, res) => {
    const shopData = { ...req.body, owner_id: req.user.id };
    const shop = await this.shopService.createShop(shopData);
    
    res.status(201).json(
      successResponse(shop, 'Shop created successfully')
    );
  });

  updateShop = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const shop = await this.shopService.updateShop(id, req.body);
    
    if (!shop) {
      return res.status(404).json(
        errorResponse('Shop not found', 404)
      );
    }
    
    res.status(200).json(
      successResponse(shop, 'Shop updated successfully')
    );
  });

  deleteShop = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const result = await this.shopService.deleteShop(id);
    
    if (!result) {
      return res.status(404).json(
        errorResponse('Shop not found', 404)
      );
    }
    
    res.status(200).json(
      successResponse(null, 'Shop deleted successfully')
    );
  });
}

module.exports = ShopController;