const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthService {
  constructor(pool) {
    this.pool = pool;
  }

  register = async (userData) => {
    const { username, email, password } = userData;
    
    // Check if user already exists
    const existingUser = await this.pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    
    if (existingUser.rows.length > 0) {
      throw new Error('User already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await this.pool.query(
      'INSERT INTO "user" (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    
    const user = result.rows[0];
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      success: true,
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
      }
    };
  };

  login = async (loginData) => {
    const { email, password } = loginData;
    
    // Find user
    const result = await this.pool.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      throw new Error('Invalid credentials');
    }
    
    const user = result.rows[0];
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.user_id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    return {
      success: true,
      token,
      user: {
        id: user.user_id,
        username: user.username,
        email: user.email
      }
    };
  };

  findUserById = async (userId) => {
    const result = await this.pool.query(
      'SELECT user_id as id, username, email FROM "user" WHERE user_id = $1',
      [userId]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const user = result.rows[0];
    return {
      ...user,
      toResponse: () => ({
        id: user.id,
        username: user.username,
        email: user.email
      })
    };
  };
}

module.exports = AuthService;
