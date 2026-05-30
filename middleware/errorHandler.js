import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';

export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  const error = { ...err };
  error.message = err.message;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: message || ERROR_MESSAGES.VALIDATION_ERROR,
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(HTTP_STATUS.CONFLICT).json({
      success: false,
      message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    });
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: 'Invalid ID format',
    });
  }

  res.status(error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
  });
};
