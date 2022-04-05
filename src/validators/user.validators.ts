import * as Joi from 'joi';
import { regexp } from '../constants';

export const userValidators = {
    createUser: Joi.object({
        firstName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        lastName: Joi
            .string()
            .min(2)
            .max(20)
            .required(),
        age: Joi
            .number()
            .min(18)
            .max(100),
        phone: Joi
            .string()
            .regex(regexp.PHONE)
            .required(),
        email: Joi
            .string()
            .regex(regexp.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(regexp.PASSWORD)
            .required(),
    }),

    loginUser: Joi.object({
        email: Joi
            .string()
            .regex(regexp.EMAIL)
            .trim()
            .required(),
        password: Joi
            .string()
            .regex(regexp.PASSWORD)
            .required(),
    }),
};
