const Joi = require('joi');

const updateUserSchema = Joi.object({
  name: Joi.string().trim().optional().messages({
    'string.empty': 'Name cannot be empty',
  }),
  email: Joi.string().email().trim().optional().messages({
    'string.email': 'Please enter a valid email',
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'Password must be at least 6 characters long',
  }),
  location: Joi.string().min(6).max(50).optional().messages({
    "string.min": "Location must be at least 6 characters long",
    "string.max": "Location must be at most 50 characters long",
  }),
  role: Joi.string().valid('user', 'admin').optional(),
}).min(1); // Ensure at least one field is being updated

const validateUpdateUser = (userData) => {
  return updateUserSchema.validate(userData, { abortEarly: false });
};

module.exports = validateUpdateUser;
