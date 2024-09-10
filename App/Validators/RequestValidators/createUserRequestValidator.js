const Joi = require("joi");

const userRequestSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(3)
    .max(50)
    .regex(/^[a-zA-Z ]+$/)
    .required()
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must be at most 50 characters long",
      "string.pattern.base":
        "Name must contain only alphabetic characters and spaces.",
    }),
  email: Joi.string().email().trim().required().messages({
    "string.email": "Please enter a valid email",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .max(128)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password must not exceed 128 characters.",
      "string.pattern.base":
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
  location: Joi.string()
    .min(6)
    .max(100)
    .regex(/^[a-zA-Z0-9, :]+$/)
    .required()
    .messages({
      "string.min": "Location must be at least 6 characters long",
      "string.max": "Location must be at most 100 characters long",
      "string.pattern.base":
        "Location can only contain letters, numbers, commas, colons, and spaces.",
      "string.empty": "Location is required",
      "any.required": "Location is required",
    }),
  role: Joi.string().valid("user", "admin").default("user"),
  isAdult: Joi.boolean().valid(true).required().messages({
    "boolean.base": "isAdult must be a boolean value.",
    "any.only": "You must confirm that you are 18 years of age or older.",
    "any.required": "Confirming your age is required.",
  }),
});

const creatUserRequestValidator = (userData) => {
  return userRequestSchema.validate(userData, { abortEarly: false });
};

module.exports = creatUserRequestValidator;
