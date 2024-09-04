const Joi = require("joi");

const updateGroupSchema = Joi.object({
  name: Joi.string().trim().min(3).max(10).optional().messages({
    "string.min": "Name must be at least 3 characters long",
    "string.max": "Name must be at most 10 characters long",
  }),
  about: Joi.string().trim().min(15).max(100).optional().messages({
    "string.min": "About must be at least 15 characters long",
    "string.max": "About must be at most 100 characters long",
  }),
  members: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
  location: Joi.string().min(6).max(50).optional().messages({
    "string.min": "Location must be at least 6 characters long",
    "string.max": "Location must be at most 50 characters long",
  }),
  founders: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),

  events: Joi.array()
    .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
    .optional(),
});

const validateUpdateGroup = (groupData) => {
  return updateGroupSchema.validate(groupData, { abortEarly: false });
};

module.exports = validateUpdateGroup;
