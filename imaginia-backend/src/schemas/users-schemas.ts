import Joi from "joi";
import { CreateUserParams } from "../protocols";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});


export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});