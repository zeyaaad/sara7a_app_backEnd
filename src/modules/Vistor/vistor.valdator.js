
import Joi from "joi";






export const addVistorShcema = Joi.object({
  userId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'userId is required',
      'string.length': 'invalid userId',
      'string.hex': 'invalid userId'
    }),
  profileId: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      'string.length': 'invalid profileId',
      'string.hex': 'invalid profileId'
    })
});
export const getVistorShcema = Joi.object({
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

