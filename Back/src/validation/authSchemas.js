import Joi from "joi";

export const signupSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
  accountType: Joi.string().valid("investor", "msme").required(),
  termsAccepted: Joi.boolean().valid(true).required(),
});

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});