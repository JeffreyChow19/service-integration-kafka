import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ArraySchema } from '@hapi/joi';

export const validateRequest = (
  schema: ObjectSchema | ArraySchema,
) => (req: Request, res: Response, next: NextFunction): void => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    res.status(400).json({
      message: 'Validation Error',
      details: error.message,
    });
    return;
  }

  next();
};
