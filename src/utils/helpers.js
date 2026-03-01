// Utility functions

/**
 * Generates a standardized success response
 */
const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  };
};

/**
 * Generates a standardized error response
 */
const errorResponse = (message, statusCode = 400, details = null) => {
  return {
    success: false,
    error: message,
    details,
    statusCode
  };
};

/**
 * Async wrapper to catch errors in route handlers
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Generates a random string for tokens, IDs, etc.
 */
const generateRandomString = (length = 32) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Validates if a string is a valid email
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates if a string is a valid phone number
 */
const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?\d{10,15}$/;
  return phoneRegex.test(phone);
};

/**
 * Sanitizes user input by removing potentially harmful characters
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
};

/**
 * Paginates database results
 */
const paginate = (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  return { limit: parseInt(limit), offset };
};

/**
 * Formats distance in meters to human-readable format
 */
const formatDistance = (meters) => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

/**
 * Checks if a coordinate is within a valid range
 */
const isValidCoordinate = (lat, lon) => {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
};

/**
 * Creates a slug from a string
 */
const createSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

module.exports = {
  successResponse,
  errorResponse,
  asyncHandler,
  generateRandomString,
  isValidEmail,
  isValidPhone,
  sanitizeInput,
  paginate,
  formatDistance,
  isValidCoordinate,
  createSlug
};
