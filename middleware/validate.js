import { HTTP_STATUS } from '../config/constants.js';

export const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const details = error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));

      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Validation error',
        details,
      });
    }

    req.body = value;
    next();
  };
};
