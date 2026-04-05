const Joi = require("joi");

const recordSchema = Joi.object({
  amount: Joi.number().positive().required(),
  type: Joi.string().valid("INCOME", "EXPENSE").required(),
  category: Joi.string().required(),
  date: Joi.date().required(),
  notes: Joi.string().allow("")
});

module.exports = { recordSchema };