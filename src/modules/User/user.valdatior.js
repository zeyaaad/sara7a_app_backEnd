import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[\p{L}\p{N} ]+$/u) 
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot be longer than 50 characters',
      'string.pattern.base': 'Name can only contain letters, numbers, and spaces'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    }),

  gender: Joi.string()
    .valid('male', 'female')
    .required()
    .messages({
      'string.empty': 'Gender is required',
      'string.valid': 'Gender must be either male or female'
    })
});



export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please provide a valid email address'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
    })
});




export const userSchema = Joi.object({
  userId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'User ID is required',
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});


export const changeDataSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .regex(/^[\p{L}\p{N} ]+$/u) 
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot be longer than 50 characters',
      'string.pattern.base': 'Name can only contain letters, numbers, and spaces'
    }),
  gender: Joi.string()
    .valid('male', 'female')
    .required()
    .messages({
      'string.empty': 'Gender is required',
      'string.valid': 'Gender must be either male or female'
    }),
  bio: Joi.string()
  .min(1)
  .max(100)
  .regex(/^[\p{L}\p{N}\p{P}\p{S}\p{Z}\p{M}\p{So}]+$/u) 
  .allow('')
  .optional() 
  .messages({
    'string.min': 'Bio must be at least 5 characters long',
    'string.max': 'Bio cannot be longer than 100 characters',
    'string.pattern.base': 'Bio can only contain letters, numbers, special characters, and emojis'
  }),
    userId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'User ID is required',
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});

export const changePasswordSchema = Joi.object({
  userId: Joi.string()
    .required()
    .hex()
    .length(24)
    .messages({
      'string.empty': 'User ID is required',
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    }),
    
  currentPassword: Joi.string()
    .min(6)
    .max(50)
    .required()
    .messages({
      'string.empty': 'currentPassword is required',
      'string.min': 'currentPassword must be at least 6 characters long',
      'string.max': 'currentPassword cannot be longer than 50 characters'
    }),
  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 6 characters long',
      'string.max': 'Password cannot be longer than 50 characters'
    }),
  rePassword: Joi.any()
    .valid(Joi.ref('password'))
    .required()
    .messages({
      'any.only': 'Passwords must match',
      'any.required': 'Please confirm your password'
    })
});


export const SearchSchema = Joi.object({
  name: Joi.string()
    .min(1)
    .max(50)
    .regex(/^[\p{L}\p{N} ]+$/u) 
    .optional() 
    .messages({
      'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name cannot be longer than 50 characters',
      'string.pattern.base': 'Name can only contain letters, numbers, and spaces'
    }),
  userId: Joi.string()
    .hex() 
    .length(24) 
    .optional() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});
export const schemaWhoCanSend = Joi.object({
 typeSend: Joi.number()
    .valid(0, 1) 
    .required() 
    .messages({
      'number.base': 'WhoCanSend must be a number',
      'any.only': 'WhoCanSend must be either 0 or 1',
      'any.required': 'WhoCanSend is required'
    }),
  userId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});
export const shcemaNoti = Joi.object({
 allowNoti: Joi.number()
    .valid(0, 1) 
    .required() 
    .messages({
      'number.base': 'allowNoti must be a number',
      'any.only': 'allowNoti must be either 0 or 1',
      'any.required': 'allowNoti is required'
    }),
  userId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});
export const shcemaStatus = Joi.object({
 status: Joi.number()
    .valid(0, 1) 
    .required() 
    .messages({
      'number.base': 'allowNoti must be a number',
      'any.only': 'allowNoti must be either 0 or 1',
      'any.required': 'allowNoti is required'
    }),
  userId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});


export const shcemavistor = Joi.object({
 profileId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    }),
  userId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});


export const shcemaGetVistors = Joi.object({
 profileId: Joi.string()
    .hex() 
    .length(24) 
    .required() 
    .messages({
      'string.length': 'Invalid User ID',
      'string.hex': 'Invalid User ID'
    })
});
