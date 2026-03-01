const { successResponse, errorResponse, asyncHandler } = require('../utils/helpers');

class AdminController {
  constructor(adminService) {
    this.adminService = adminService;
  }

  confirmApproval = asyncHandler(async (req, res) => {
    const { shopId } = req.params;
    const updatedShop = await this.adminService.approvePayment(shopId);
    
    res.status(200).json(
      successResponse(
        { 
          message: 'Payment verified. Shop is now active for 30 days.', 
          expiryDate: updatedShop.latest_paid_date 
        },
        'Shop payment approved successfully'
      )
    );
  });

  getStats = asyncHandler(async (req, res) => {
    const stats = await this.adminService.getPlatformStats();
    
    res.status(200).json(
      successResponse(stats, 'Platform statistics retrieved successfully')
    );
  });

  deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    // Placeholder implementation
    res.status(200).json(
      successResponse(
        { deletedPostId: postId },
        `Post ${postId} deleted successfully`
      )
    );
  });
}

module.exports = AdminController;