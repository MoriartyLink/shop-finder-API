class ShopController {
  constructor(shopService) {
    this.shopService = shopService;
  }

  getAllShops = async (req, res) => {
    try {
      const shops = await this.shopService.getAllShops();
      res.status(200).json({ success: true, data: shops });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getShopById = async (req, res) => {
    try {
      const { id } = req.params;
      const shop = await this.shopService.getShopById(id);
      
      if (!shop) {
        return res.status(404).json({ success: false, error: 'Shop not found' });
      }
      
      res.status(200).json({ success: true, data: shop });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  createShop = async (req, res) => {
    try {
      const shopData = req.body;
      const shop = await this.shopService.createShop(shopData);
      res.status(201).json({ success: true, data: shop });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  updateShop = async (req, res) => {
    try {
      const { id } = req.params;
      const shopData = req.body;
      const shop = await this.shopService.updateShop(id, shopData);
      
      if (!shop) {
        return res.status(404).json({ success: false, error: 'Shop not found' });
      }
      
      res.status(200).json({ success: true, data: shop });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  deleteShop = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.shopService.deleteShop(id);
      
      if (!result) {
        return res.status(404).json({ success: false, error: 'Shop not found' });
      }
      
      res.status(200).json({ success: true, message: 'Shop deleted successfully' });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

module.exports = ShopController;