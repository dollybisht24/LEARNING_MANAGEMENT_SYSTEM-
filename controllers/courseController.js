import { courseService } from '../services/courseService.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../config/constants.js';

export const courseController = {
  async createCourse(req, res, next) {
    try {
      const result = await courseService.createCourse(req.body, req.user.userId);
      sendSuccess(res, result.data, result.message, HTTP_STATUS.CREATED);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getAllCourses(req, res, next) {
    try {
      const { category, instructor, level, search, page, limit, sort } = req.query;
      const filters = { category, instructor, level, search };
      const pagination = { page, limit, sort };

      const result = await courseService.getCourses(filters, pagination);
      sendPaginatedResponse(res, result.data, result.pagination, 'Courses retrieved successfully');
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getCourseById(req, res, next) {
    try {
      const result = await courseService.getCourseById(req.params.id);
      sendSuccess(res, result.data, 'Course retrieved successfully');
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async updateCourse(req, res, next) {
    try {
      const result = await courseService.updateCourse(
        req.params.id,
        req.body,
        req.user.userId
      );
      sendSuccess(res, result.data, result.message);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async deleteCourse(req, res, next) {
    try {
      const result = await courseService.deleteCourse(req.params.id, req.user.userId);
      sendSuccess(res, null, result.message);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getCoursesByCategory(req, res, next) {
    try {
      const { page, limit } = req.query;
      const pagination = { page, limit };

      const result = await courseService.getCoursesByCategory(
        req.params.category,
        pagination
      );
      sendPaginatedResponse(
        res,
        result.data,
        result.pagination,
        'Courses retrieved successfully'
      );
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getCoursesByInstructor(req, res, next) {
    try {
      const { page, limit } = req.query;
      const pagination = { page, limit };

      const result = await courseService.getCoursesByInstructor(
        req.params.instructorId,
        pagination
      );
      sendPaginatedResponse(
        res,
        result.data,
        result.pagination,
        'Courses retrieved successfully'
      );
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },
};
