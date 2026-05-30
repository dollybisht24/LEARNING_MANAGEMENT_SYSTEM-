import jwt from 'jsonwebtoken';
import { HTTP_STATUS, ERROR_MESSAGES } from '../config/constants.js';

export const protect = (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error.message);
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      success: false,
      message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(HTTP_STATUS.UNAUTHORIZED).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(HTTP_STATUS.FORBIDDEN).json({
        success: false,
        message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS,
      });
    }

    next();
  };
};
