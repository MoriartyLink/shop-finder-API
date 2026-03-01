// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Default error
  let error = {
    success: false,
    error: 'Internal server error',
    message: err.message
  };

  // Validation error
  if (err.name === 'ValidationError') {
    error.error = 'Validation failed';
    error.details = err.details;
    return res.status(400).json(error);
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    error.error = 'Invalid token';
    return res.status(401).json(error);
  }

  if (err.name === 'TokenExpiredError') {
    error.error = 'Token expired';
    return res.status(401).json(error);
  }

  // Database error
  if (err.code === '23505') { // Unique violation
    error.error = 'Duplicate entry';
    return res.status(409).json(error);
  }

  if (err.code === '23503') { // Foreign key violation
    error.error = 'Invalid reference';
    return res.status(400).json(error);
  }

  // File upload error
  if (err.code === 'LIMIT_FILE_SIZE') {
    error.error = 'File too large';
    return res.status(413).json(error);
  }

  if (err.code === 'LIMIT_FILE_COUNT') {
    error.error = 'Too many files';
    return res.status(413).json(error);
  }

  // Custom application errors
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message || 'Application error'
    });
  }

  // Default 500 error
  res.status(500).json(error);
};

module.exports = errorHandler;
