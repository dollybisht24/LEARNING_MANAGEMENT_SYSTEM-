import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const authService = {
  async registerUser(userData) {
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        const error = new Error(ERROR_MESSAGES.EMAIL_ALREADY_EXISTS);
        error.statusCode = HTTP_STATUS.CONFLICT;
        throw error;
      }

      // Create new user
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role || 'student',
      });

      const token = generateToken(user._id, user.role);

      return {
        success: true,
        message: SUCCESS_MESSAGES.USER_CREATED,
        data: {
          user: user.toJSON(),
          token,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  async loginUser(email, password) {
    try {
      if (!email || !password) {
        const error = new Error(ERROR_MESSAGES.VALIDATION_ERROR);
        error.statusCode = HTTP_STATUS.BAD_REQUEST;
        throw error;
      }

      // Find user and include password field
      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        error.statusCode = HTTP_STATUS.UNAUTHORIZED;
        throw error;
      }

      // Compare passwords
      const isPasswordMatch = await user.matchPassword(password);

      if (!isPasswordMatch) {
        const error = new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        error.statusCode = HTTP_STATUS.UNAUTHORIZED;
        throw error;
      }

      const token = generateToken(user._id, user.role);

      return {
        success: true,
        message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
        data: {
          user: user.toJSON(),
          token,
        },
      };
    } catch (error) {
      throw error;
    }
  },

  async getUserProfile(userId) {
    try {
      const user = await User.findById(userId)
        .populate('enrolledCourses', 'title description category')
        .populate('createdCourses', 'title description category');

      if (!user) {
        const error = new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw error;
    }
  },
};
