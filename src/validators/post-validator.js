const Joi = require('joi');

// Post validation schemas
const postSchemas = {
  create: Joi.object({
    user_id: Joi.number()
      .integer()
      .positive()
      .required()
      .messages({
        'number.base': 'User ID must be a number',
        'number.integer': 'User ID must be an integer',
        'number.positive': 'User ID must be positive',
        'any.required': 'User ID is required'
      }),
    
    post_type: Joi.string()
      .valid('general', 'promotion', 'announcement')
      .default('general')
      .messages({
        'any.only': 'Post type must be one of: general, promotion, announcement'
      }),
    
    content: Joi.string()
      .min(1)
      .max(2000)
      .required()
      .messages({
        'string.min': 'Content must be at least 1 character long',
        'string.max': 'Content must not exceed 2000 characters',
        'any.required': 'Content is required'
      }),
    
    hashtag: Joi.string()
      .max(100)
      .optional()
      .allow('')
      .pattern(new RegExp('^#?[\\w]+$'))
      .messages({
        'string.pattern.base': 'Hashtag must contain only letters, numbers, and underscores'
      }),
    
    tagged_shop_id: Joi.number()
      .integer()
      .positive()
      .optional()
      .allow(null)
      .messages({
        'number.base': 'Tagged shop ID must be a number',
        'number.integer': 'Tagged shop ID must be an integer',
        'number.positive': 'Tagged shop ID must be positive'
      })
  }),

  update: Joi.object({
    content: Joi.string()
      .min(1)
      .max(2000)
      .optional(),
    
    hashtag: Joi.string()
      .max(100)
      .optional()
      .allow('')
      .pattern(new RegExp('^#?[\\w]+$')),
    
    tagged_shop_id: Joi.number()
      .integer()
      .positive()
      .optional()
      .allow(null)
  }).min(1)
};

module.exports = postSchemas;
