import * as Joi from 'joi';

export const paramsValidators = {
    id: Joi.object({
        id: Joi
            .string()
            .required(),
    }),
};
