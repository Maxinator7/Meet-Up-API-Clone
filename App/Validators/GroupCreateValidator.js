const Joi = require("joi");

const createGroupSchema = Joi.object({
  name: Joi.string().trim().min(3).max(10).required().messages({
    "string.empty": "Name is required",
    "any.required": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 10 characters long",
  }),
  about: Joi.string().trim().min(15).max(100).required().messages({
    "string.empty": "About is required",
    "any.required": "About is required",
    "string.min": "About must be at least 15 characters long",
    "string.max": "About must be at most 100 characters long",
  }),
  members: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  location: Joi.string().min(6).max(50).required().messages({
    "string.min": "Location must be at least 6 characters long",
    "string.max": "Location must be at most 50 characters long",
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),

  founders: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  events: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const validateCreateGroup = (groupData) => {
  return createGroupSchema.validate(groupData, { abortEarly: false });
};

module.exports = validateCreateGroup;
