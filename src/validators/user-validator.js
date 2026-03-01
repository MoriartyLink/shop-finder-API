const Joi = require('joi');

// User validation schemas
const userSchemas = {
  register: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.alphanum': 'Username must only contain alphanumeric characters',
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username must not exceed 30 characters',
        'any.required': 'Username is required'
      }),
    
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .min(6)
      .max(128)
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)'))
      .required()
      .messages({
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must not exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, and one number',
        'any.required': 'Password is required'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  updateProfile: Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .optional(),
    
    email: Joi.string()
      .email()
      .optional(),
    
    phone_number: Joi.string()
      .pattern(new RegExp('^[+]?\\d{10,15}$'))
      .optional()
      .messages({
        'string.pattern.base': 'Phone number must be valid (10-15 digits, optional + prefix)'
      })
  }).min(1)
};

module.exports = userSchemas;
