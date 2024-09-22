
import Joi from "joi";




const emojiPattern = '\\p{Emoji}';

export const addMessageSchema = Joi.object({
    messageText: Joi.string()
    .min(3)
    .max(500)
    // Allow Arabic, English letters, numbers, spaces, all special characters, and emojis
    .pattern(new RegExp(`^[\\u0600-\\u06FFa-zA-Z0-9\\s\\p{P}\\p{S}${emojiPattern}]+$`, 'u')) 
    .required()
    .messages({
      'string.empty': 'messageText is required',
      'string.min': 'messageText must be at least 3 characters long',
      'string.max': 'messageText cannot be longer than 500 characters',
      'string.pattern.base': 'messageText can only contain Arabic and English letters, numbers, spaces, punctuation marks, special characters, and emojis',
    }),
  recievedId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'recievedId is required',
      'string.length': 'invalid recievedId',
      'string.hex': 'invalid recievedId'
    }),

  seenderId: Joi.string()
    .hex()
    .length(24)
    .messages({
      'string.length': 'invalid seenderId',
      'string.hex': 'invalid seenderId'
    })
});
export const mainMessageSchema = Joi.object({
  userId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'userId is required',
      'string.length': 'invalid userId',
      'string.hex': 'invalid userId'
    }),
  messageId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.length': 'invalid messageId',
      'string.hex': 'invalid messageId'
    })
});
export const seenSchema = Joi.object({
  userId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'userId is required',
      'string.length': 'invalid userId',
      'string.hex': 'invalid userId'
    })
});

