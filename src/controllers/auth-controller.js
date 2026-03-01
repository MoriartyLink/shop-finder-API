const AuthService = require('../services/auth-service');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Username, email, and password are required'
        });
      }
      
      const result = await this.authService.register({ username, email, password });
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required'
        });
      }
      
      const result = await this.authService.login({ email, password });
      res.status(200).json(result);
    } catch (error) {
      res.status(401).json({ success: false, error: error.message });
    }
  };

  getProfile = async (req, res) => {
    try {
      const userId = req.user.id; // Extracted from authMiddleware
      const user = await this.authService.findUserById(userId);
      
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      res.status(200).json(user.toResponse());
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

module.exports = AuthController;
