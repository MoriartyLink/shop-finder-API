const pool = require('./src/config/db');

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const result = await pool.query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0]);
    
    // Check if users table exists and has data
    const userCheck = await pool.query('SELECT COUNT(*) FROM "user"');
    console.log('Users in database:', userCheck.rows[0].count);
    
    // Check if admin table exists and has data
    const adminCheck = await pool.query('SELECT COUNT(*) FROM admin');
    console.log('Admins in database:', adminCheck.rows[0].count);
    
    process.exit(0);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
}

testConnection();
