import express from 'express';
import { courseController } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { courseValidationSchemas } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.get('/category/:category', courseController.getCoursesByCategory);
router.get('/instructor/:instructorId', courseController.getCoursesByInstructor);

// Protected routes - Instructor only
router.post(
  '/',
  protect,
  authorize('instructor', 'admin'),
  validate(courseValidationSchemas.createCourse),
  courseController.createCourse
);

router.put(
  '/:id',
  protect,
  authorize('instructor', 'admin'),
  validate(courseValidationSchemas.updateCourse),
  courseController.updateCourse
);

router.delete(
  '/:id',
  protect,
  authorize('instructor', 'admin'),
  courseController.deleteCourse
);

export default router;
