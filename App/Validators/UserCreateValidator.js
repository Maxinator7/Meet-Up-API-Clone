const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().trim().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters long",
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
  location: Joi.string().min(6).max(50).required().messages({
    "string.min": "Location must be at least 6 characters long",
    "string.max": "Location must be at most 50 characters long",
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),
  role: Joi.string().valid("user", "admin").default("user"),
});

const validateCreateUser = (userData) => {
  return createUserSchema.validate(userData, { abortEarly: false });
};

module.exports = validateCreateUser;
