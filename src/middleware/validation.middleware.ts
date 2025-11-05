import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationError, ValidationResult } from 'joi';

/**
 * Generic, type-safe validation middleware for Express + Joi.
 * Automatically checks req.body against a Joi schema and returns readable errors.
 */
export const validate =
  (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    // Explicitly type the validation result
    const validationResult: ValidationResult = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    const { error }: { error?: ValidationError } = validationResult;

    if (error) {
      // Convert Joi error messages into a cleaner format
      const errors: string[] = error.details.map((detail) => detail.message.replace(/["]/g, ''));

      res.status(400).json({
        error: errors.length === 1 ? errors[0] : errors,
      });
      return;
    }

    next();
  };
