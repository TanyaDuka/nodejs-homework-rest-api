const Joi = require('joi');

const contactSchema = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email(),
      phone: Joi.number().required(),
});

module.exports = {
  add:contactSchema
} 

