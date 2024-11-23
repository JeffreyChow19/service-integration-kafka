import Joi, { ArraySchema } from '@hapi/joi';

export const availabilityValidationSchema: ArraySchema = Joi.array()
  .items(
    Joi.object({
      doctor: Joi.object({
        name: Joi.string()
          .required()
          .error(new Error('Doctor name is required')),
        specialization: Joi.string()
          .required()
          .error(new Error('Doctor specialization is required')),
      }).required(),
      time: Joi.string()
        .required()
        .error(new Error('Time is required')),
    }),
  )
  .required();
