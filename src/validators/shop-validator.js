const Joi = require('joi');

// Shop validation schemas
const shopSchemas = {
  create: Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Shop name must be at least 2 characters long',
        'string.max': 'Shop name must not exceed 100 characters',
        'any.required': 'Shop name is required'
      }),
    
    address: Joi.string()
      .min(5)
      .max(255)
      .required()
      .messages({
        'string.min': 'Address must be at least 5 characters long',
        'string.max': 'Address must not exceed 255 characters',
        'any.required': 'Address is required'
      }),
    
    phone_number: Joi.string()
      .pattern(new RegExp('^[+]?\\d{10,15}$'))
      .required()
      .messages({
        'string.pattern.base': 'Phone number must be valid (10-15 digits, optional + prefix)',
        'any.required': 'Phone number is required'
      }),
    
    description: Joi.string()
      .max(1000)
      .optional()
      .allow('')
      .messages({
        'string.max': 'Description must not exceed 1000 characters'
      }),
    
    lat: Joi.number()
      .min(-90)
      .max(90)
      .required()
      .messages({
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90',
        'any.required': 'Latitude is required'
      }),
    
    lon: Joi.number()
      .min(-180)
      .max(180)
      .required()
      .messages({
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180',
        'any.required': 'Longitude is required'
      }),
    
    monthly_fee_paid: Joi.boolean()
      .optional()
      .default(false)
  }),

  update: Joi.object({
    name: Joi.string()
      .min(2)
      .max(100)
      .optional(),
    
    address: Joi.string()
      .min(5)
      .max(255)
      .optional(),
    
    phone_number: Joi.string()
      .pattern(new RegExp('^[+]?\\d{10,15}$'))
      .optional(),
    
    description: Joi.string()
      .max(1000)
      .optional()
      .allow(''),
    
    lat: Joi.number()
      .min(-90)
      .max(90)
      .optional(),
    
    lon: Joi.number()
      .min(-180)
      .max(180)
      .optional(),
    
    monthly_fee_paid: Joi.boolean()
      .optional()
  }).min(1),

  nearbySearch: Joi.object({
    lat: Joi.number()
      .min(-90)
      .max(90)
      .required()
      .messages({
        'number.min': 'Latitude must be between -90 and 90',
        'number.max': 'Latitude must be between -90 and 90',
        'any.required': 'Latitude is required'
      }),
    
    lon: Joi.number()
      .min(-180)
      .max(180)
      .required()
      .messages({
        'number.min': 'Longitude must be between -180 and 180',
        'number.max': 'Longitude must be between -180 and 180',
        'any.required': 'Longitude is required'
      }),
    
    radius: Joi.number()
      .min(100)
      .max(50000)
      .optional()
      .default(5000)
      .messages({
        'number.min': 'Search radius must be at least 100 meters',
        'number.max': 'Search radius must not exceed 50000 meters'
      })
  })
};

module.exports = shopSchemas;
