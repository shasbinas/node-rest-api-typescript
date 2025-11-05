import Joi from 'joi';

/**
 * 🧮 Generate valid class list (1A–10F)
 * e.g., "1A", "1B", ..., "10F"
 */
const validClasses: string[] = Array.from({ length: 10 }, (_, i) =>
  ['A', 'B', 'C', 'D', 'E', 'F'].map((div) => `${i + 1}${div}`),
).flat();

/**
 * 🧠 CREATE Student Validation Schema
 * Enforces full student object validation.
 */
export const createStudentValidation = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
    .min(2)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Name is required',
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'string.pattern.base': 'Name can only contain letters and spaces',
      'any.required': 'Name is required',
    }),

  marks: Joi.number().min(0).max(100).required().messages({
    'number.base': 'Marks must be a valid number',
    'number.min': 'Marks must be ≥ 0',
    'number.max': 'Marks must be ≤ 100',
    'any.required': 'Marks are required',
  }),

  class: Joi.string()
    .valid(...validClasses)
    .required()
    .messages({
      'any.only': 'Class must be between 1A and 10F (A–F divisions only)',
      'string.empty': 'Class is required',
      'any.required': 'Class is required',
    }),
});

/**
 * 🛠 UPDATE Student Validation Schema
 * Allows partial updates, but requires at least one field.
 */
export const studentUpdateValidation = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
    .min(2)
    .max(50)
    .messages({
      'string.min': 'Name must be at least 2 characters',
      'string.max': 'Name cannot exceed 50 characters',
      'string.pattern.base': 'Name can only contain letters and spaces',
    }),

  marks: Joi.number().min(0).max(100).messages({
    'number.base': 'Marks must be a valid number',
    'number.min': 'Marks must be ≥ 0',
    'number.max': 'Marks must be ≤ 100',
  }),

  class: Joi.string()
    .valid(...validClasses)
    .messages({
      'any.only': 'Class must be between 1A and 10F (A–F divisions only)',
    }),
})
  .min(1)
  .messages({
    'object.min': 'At least one field must be provided for update',
  });

/**
 * ✅ Optional helper (for middleware use)
 */
export type StudentValidationType = {
  name?: string;
  marks?: number;
  class?: string;
};
