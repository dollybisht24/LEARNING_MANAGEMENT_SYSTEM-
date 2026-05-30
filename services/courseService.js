import Course from '../models/Course.js';
import User from '../models/User.js';
import { HTTP_STATUS, ERROR_MESSAGES, SUCCESS_MESSAGES } from '../config/constants.js';

export const courseService = {
  async createCourse(courseData, instructorId) {
    try {
      const course = await Course.create({
        ...courseData,
        instructor: instructorId,
      });

      // Add course to instructor's created courses
      await User.findByIdAndUpdate(
        instructorId,
        { $push: { createdCourses: course._id } },
        { new: true }
      );

      return {
        success: true,
        message: SUCCESS_MESSAGES.COURSE_CREATED,
        data: course,
      };
    } catch (error) {
      throw error;
    }
  },

  async getCourses(filters = {}, pagination = {}) {
    try {
      const { category, instructor, level, search } = filters;
      const { page = 1, limit = 10, sort = '-createdAt' } = pagination;

      let query = { isActive: true };

      if (category) query.category = category;
      if (instructor) query.instructor = instructor;
      if (level) query.level = level;
      if (search) {
        query.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (page - 1) * limit;

      const courses = await Course.find(query)
        .populate('instructor', 'name email')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await Course.countDocuments(query);

      return {
        success: true,
        data: courses,
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

  async getCourseById(courseId) {
    try {
      const course = await Course.findById(courseId)
        .populate('instructor', 'name email role')
        .populate('enrolledStudents', 'name email');

      if (!course) {
        const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      return {
        success: true,
        data: course,
      };
    } catch (error) {
      throw error;
    }
  },

  async updateCourse(courseId, updateData, instructorId) {
    try {
      const course = await Course.findById(courseId);

      if (!course) {
        const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      // Check if user is the instructor
      if (course.instructor.toString() !== instructorId) {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
        error.statusCode = HTTP_STATUS.FORBIDDEN;
        throw error;
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        updateData,
        { new: true, runValidators: true }
      );

      return {
        success: true,
        message: SUCCESS_MESSAGES.COURSE_UPDATED,
        data: updatedCourse,
      };
    } catch (error) {
      throw error;
    }
  },

  async deleteCourse(courseId, instructorId) {
    try {
      const course = await Course.findById(courseId);

      if (!course) {
        const error = new Error(ERROR_MESSAGES.COURSE_NOT_FOUND);
        error.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error;
      }

      // Check if user is the instructor
      if (course.instructor.toString() !== instructorId) {
        const error = new Error(ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
        error.statusCode = HTTP_STATUS.FORBIDDEN;
        throw error;
      }

      await Course.findByIdAndDelete(courseId);

      // Remove course from instructor's created courses
      await User.findByIdAndUpdate(
        instructorId,
        { $pull: { createdCourses: courseId } },
        { new: true }
      );

      return {
        success: true,
        message: SUCCESS_MESSAGES.COURSE_DELETED,
      };
    } catch (error) {
      throw error;
    }
  },

  async getCoursesByCategory(category, pagination = {}) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;

      const courses = await Course.find({ category, isActive: true })
        .populate('instructor', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort('-createdAt');

      const total = await Course.countDocuments({ category, isActive: true });

      return {
        success: true,
        data: courses,
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

  async getCoursesByInstructor(instructorId, pagination = {}) {
    try {
      const { page = 1, limit = 10 } = pagination;
      const skip = (page - 1) * limit;

      const courses = await Course.find({ instructor: instructorId, isActive: true })
        .populate('instructor', 'name email')
        .skip(skip)
        .limit(parseInt(limit))
        .sort('-createdAt');

      const total = await Course.countDocuments({ instructor: instructorId, isActive: true });

      return {
        success: true,
        data: courses,
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
};
