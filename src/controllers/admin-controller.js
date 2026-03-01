class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  // Admin clicks 'Approve' after seeing the slip
  confirmApproval = async (req, res) => {
    try {
      const { shopId } = req.params;
      const updatedShop = await this.adminService.approvePayment(shopId);
      
      res.json({ 
        success: true, 
        message: 'Payment verified. Shop is now active for 30 days.', 
        expiryDate: updatedShop.latest_paid_date 
      });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  getStats = async (req, res) => {
    try {
      const stats = await this.adminService.getPlatformStats();
      res.json({ success: true, data: stats });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };

  deletePost = async (req, res) => {
    try {
      const { postId } = req.params;
      // Placeholder implementation
      res.json({ success: true, message: `Post ${postId} deleted successfully` });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  };
}

module.exports = AdminController;