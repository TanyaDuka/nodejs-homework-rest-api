const { Schema, model} = require('mongoose');
const Joi = require('joi');

const { handlerSchemaValidationError } = require('../helpers');

const emailRegexp = /^[\w.]+@[\w]+.[\w]+$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL:{
    type: String,
    required:true
  }
}, {versionKey: false, timestamps: true })


userSchema.post('save', handlerSchemaValidationError);

const singUpSchemaJoi = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.string().required().valid(Joi.ref('password')),
})

const loginSchemaJoi = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required()
})

const contactSchemaJoiUpdateSubscription = Joi.object({
      subscription:Joi.string().valid("starter", "pro", "business").required()
});

const User = model('user', userSchema);

const schemaJoi = {
    singUpSchema: singUpSchemaJoi,
    loginSchema: loginSchemaJoi,
    updateSubscription:contactSchemaJoiUpdateSubscription
}

module.exports = {
    User,
    schemaJoi,
}