import { authService } from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../config/constants.js';

export const authController = {
  async register(req, res, next) {
    try {
      const result = await authService.registerUser(req.body);
      sendSuccess(
        res,
        result.data,
        result.message,
        HTTP_STATUS.CREATED
      );
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const result = await authService.loginUser(email, password);
      sendSuccess(res, result.data, result.message);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getProfile(req, res, next) {
    try {
      const result = await authService.getUserProfile(req.user.userId);
      sendSuccess(res, result.data, 'Profile retrieved successfully');
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },
};
