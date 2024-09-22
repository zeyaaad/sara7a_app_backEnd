import Joi from 'joi';

export const orderSchema = Joi.object({
  userId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.hex': 'User ID must be a valid hexadecimal string',
      'string.length': 'User ID must be exactly 24 characters long',
      'string.empty': 'User ID is required'
    }),
  
  messageText: Joi.string()
    .min(0) 
    .max(150) 
    .optional() 
    .messages({
      'string.min': 'Message must be at least 5 characters long',
      'string.max': 'Message cannot be longer than 150 characters'
    }),
    why: Joi.string()
    .min(5) 
    .max(150) 
    .required() 
    .messages({
      'string.min': 'Reason for upgrade must be at least 5 characters long',
      'string.max': 'MessaReason for upgradege cannot be longer than 150 characters',
      'string.empty': 'Reason for upgrade is required'
    }),
});
