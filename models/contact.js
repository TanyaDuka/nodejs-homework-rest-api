const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {handlerSchemaValidationError} =require('../helpers')

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      unique:[true, 'Name mist be unique'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
  },
        owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
}, { versionKey: false, timestamps: true })

contactSchema.post('save', handlerSchemaValidationError);

const contactSchemaJoiAdd = Joi.object({
      name: Joi.string().min(3).max(50).required(),
      email: Joi.string().email(),
      phone: Joi.number().required(),
      favorite:Joi.boolean()
});

const contactSchemaJoiUpdate = Joi.object({
      favorite:Joi.boolean().required()
});

const Contact = model('contact', contactSchema);

const schemaJoi = {
  addSchema: contactSchemaJoiAdd,
  updateSchema:contactSchemaJoiUpdate
} 

module.exports = {
    Contact,
    schemaJoi
}