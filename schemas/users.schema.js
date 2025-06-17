import Joi from "joi";

export const userSchema = Joi.object({
    firstName: Joi.string().min(2).max(255).required(),
    lastName: Joi.string().min(2).max(255).required(),
    secondLastName: Joi.string().min(2).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})