const { successResponse, errorResponse, asyncHandler } = require('../utils/helpers');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    
    const result = await this.authService.register({ username, email, password });
    
    res.status(201).json(
      successResponse(result, 'User registered successfully')
    );
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const result = await this.authService.login({ email, password });
    
    res.status(200).json(
      successResponse(result, 'Login successful')
    );
  });

  getProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id; // Extracted from authMiddleware
    const user = await this.authService.findUserById(userId);
    
    if (!user) {
      return res.status(404).json(
        errorResponse('User not found', 404)
      );
    }

    res.status(200).json(
      successResponse(user.toResponse(), 'Profile retrieved successfully')
    );
  });
}

module.exports = AuthController;
