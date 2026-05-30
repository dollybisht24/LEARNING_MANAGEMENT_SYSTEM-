import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

export const enrollmentService = {
  async enrollStudent(studentId, courseId) {
    try {
      // Check if course exists
      const course = await Course.findById(courseId);
      if (!course) {
        const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      // Check if already enrolled
      const existingEnrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
      });

      if (existingEnrollment) {
        const error = new Error(ERROR_MESSAGES.ALREADY_ENROLLED);
        error.statusCode = HTTP_STATUS.CONFLICT;
        throw error;
      }

      // Create enrollment
      const enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
      });

      // Add to course's enrolled students
      await Course.findByIdAndUpdate(
        courseId,
        { $push: { enrolledStudents: studentId } },
        { new: true }
      );

      // Add to user's enrolled courses
      await User.findByIdAndUpdate(
        studentId,
        { $push: { enrolledCourses: courseId } },
        { new: true }
      );

      return {
        success: true,
        message: SUCCESS_MESSAGES.ENROLLMENT_SUCCESS,
        data: enrollment,
      };
    } catch (error) {
      throw error;
    }
  },

  async getEnrollments(studentId, pagination = {}) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;

      const enrollments = await Enrollment.find({ student: studentId })
        .populate('course', 'title description category duration')
        .populate('student', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort('-createdAt');

      const total = await Enrollment.countDocuments({ student: studentId });

      return {
        success: true,
        data: enrollments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw error;
    }
  },

  async getEnrollmentById(enrollmentId) {
    try {
      const enrollment = await Enrollment.findById(enrollmentId)
        .populate('course')
        .populate('student', 'name email');

      if (!enrollment) {
        const error = new Error(ERROR_MESSAGES.ENROLLMENT_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      return {
        success: true,
        data: enrollment,
      };
    } catch (error) {
      throw error;
    }
  },

  async updateProgress(enrollmentId, studentId, progress) {
    try {
      const enrollment = await Enrollment.findById(enrollmentId);

      if (!enrollment) {
        const error = new Error(ERROR_MESSAGES.ENROLLMENT_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      // Check if student owns this enrollment
      if (enrollment.student.toString() !== studentId) {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
        error.statusCode = HTTP_STATUS.FORBIDDEN;
        throw error;
      }

      enrollment.progress = progress;
      enrollment.lastAccessedAt = new Date();

      // Auto-complete if progress reaches 100
      if (progress === 100 && enrollment.completionStatus !== 'completed') {
        enrollment.completionStatus = 'completed';
        enrollment.completedAt = new Date();
      }

      await enrollment.save();

      return {
        success: true,
        message: SUCCESS_MESSAGES.PROGRESS_UPDATED,
        data: enrollment,
      };
    } catch (error) {
      throw error;
    }
  },

  async updateCompletionStatus(enrollmentId, studentId, status) {
    try {
      const enrollment = await Enrollment.findById(enrollmentId);

      if (!enrollment) {
        const error = new Error(ERROR_MESSAGES.ENROLLMENT_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      // Check if student owns this enrollment
      if (enrollment.student.toString() !== studentId) {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
        error.statusCode = HTTP_STATUS.FORBIDDEN;
        throw error;
      }

      enrollment.completionStatus = status;

      if (status === 'completed') {
        enrollment.completedAt = new Date();
        enrollment.progress = 100;
      }

      await enrollment.save();

      return {
        success: true,
        message: SUCCESS_MESSAGES.PROGRESS_UPDATED,
        data: enrollment,
      };
    } catch (error) {
      throw error;
    }
  },

  async getStudentProgress(studentId, courseId) {
    try {
      const enrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
      }).populate('course', 'title duration');

      if (!enrollment) {
        const error = new Error(ERROR_MESSAGES.ENROLLMENT_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      return {
        success: true,
        data: enrollment,
      };
    } catch (error) {
      throw error;
    }
  },

  async dropCourse(studentId, courseId) {
    try {
      const enrollment = await Enrollment.findOne({
        student: studentId,
        course: courseId,
      });

      if (!enrollment) {
        const error = new Error(ERROR_MESSAGES.ENROLLMENT_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      enrollment.completionStatus = 'dropped';
      await enrollment.save();

      // Remove from course
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { enrolledStudents: studentId } },
        { new: true }
      );

      // Remove from user
      await User.findByIdAndUpdate(
        studentId,
        { $pull: { enrolledCourses: courseId } },
        { new: true }
      );

      return {
        success: true,
        message: 'Course dropped successfully',
        data: enrollment,
      };
    } catch (error) {
      throw error;
    }
  },
};
