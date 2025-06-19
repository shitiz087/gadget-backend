const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = registerSchema; // same fields for login

module.exports = { registerSchema, loginSchema };
