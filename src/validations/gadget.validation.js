const Joi = require("joi");

// For update/create of a single gadget (except ID)
const gadgetSchema = Joi.object({
  name: Joi.string().trim().min(1).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().valid("mobile", "laptop", "tablet").required(),
  secretInfo: Joi.string().optional(),
});

// For update only (allow partial)
const gadgetUpdateSchema = gadgetSchema.fork(
  ["name", "price", "category"],
  (field) => field.optional()
);

// For bulk update: expect id + partial data
const bulkUpdateSchema = Joi.array().items(
  gadgetUpdateSchema.keys({
    id: Joi.number().required(),
  })
);

// For bulk delete: list of IDs
const idListSchema = Joi.array().items(Joi.number().required()).min(1);

module.exports = {
  gadgetSchema,
  gadgetUpdateSchema,
  bulkUpdateSchema,
  idListSchema,
};
