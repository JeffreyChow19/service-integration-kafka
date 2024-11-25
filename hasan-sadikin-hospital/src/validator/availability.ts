import Joi from '@hapi/joi';

// Single Availability Schema
export const availabilityValidationSchema = Joi.object({
  doctor_name: Joi.string()
    .required()
    .error(new Error('Doctor name is required')),
  specialization: Joi.string()
    .required()
    .error(new Error('Doctor specialization is required')),
  time: Joi.string()
    .required()
    .error(new Error('Time is required')),
});

// Multiple Availability Schema
export const availabilityValidationSchemaMany = Joi.array().items(
  Joi.object({
    doctor_name: Joi.string()
      .required()
      .error(new Error('Doctor name is required')),
    specialization: Joi.string()
      .required()
      .error(new Error('Doctor specialization is required')),
    time: Joi.string()
      .required()
      .error(new Error('Time is required')),
  }),
);
