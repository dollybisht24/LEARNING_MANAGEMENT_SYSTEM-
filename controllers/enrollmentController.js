import { enrollmentService } from '../services/enrollmentService.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { HTTP_STATUS } from '../config/constants.js';

export const enrollmentController = {
  async enrollCourse(req, res, next) {
    try {
      const { courseId } = req.body;
      const result = await enrollmentService.enrollStudent(req.user.userId, courseId);
      sendSuccess(res, result.data, result.message, HTTP_STATUS.CREATED);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getMyEnrollments(req, res, next) {
    try {
      const { page, limit } = req.query;
      const pagination = { page, limit };

      const result = await enrollmentService.getEnrollments(req.user.userId, pagination);
      sendPaginatedResponse(
        res,
        result.data,
        result.pagination,
        'Enrollments retrieved successfully'
      );
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getEnrollmentById(req, res, next) {
    try {
      const result = await enrollmentService.getEnrollmentById(req.params.id);
      sendSuccess(res, result.data, 'Enrollment retrieved successfully');
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async updateProgress(req, res, next) {
    try {
      const { progress } = req.body;
      const result = await enrollmentService.updateProgress(
        req.params.id,
        req.user.userId,
        progress
      );
      sendSuccess(res, result.data, result.message);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async updateCompletionStatus(req, res, next) {
    try {
      const { completionStatus } = req.body;
      const result = await enrollmentService.updateCompletionStatus(
        req.params.id,
        req.user.userId,
        completionStatus
      );
      sendSuccess(res, result.data, result.message);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async getStudentProgress(req, res, next) {
    try {
      const { courseId } = req.params;
      const result = await enrollmentService.getStudentProgress(req.user.userId, courseId);
      sendSuccess(res, result.data, 'Progress retrieved successfully');
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },

  async dropCourse(req, res, next) {
    try {
      const { courseId } = req.params;
      const result = await enrollmentService.dropCourse(req.user.userId, courseId);
      sendSuccess(res, result.data, result.message);
    } catch (error) {
      sendError(res, error.message, error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
  },
};
