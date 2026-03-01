class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  getProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Extracted from authMiddleware
      const user = await this.userService.findUserById(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      res.status(200).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

module.exports = UserController;