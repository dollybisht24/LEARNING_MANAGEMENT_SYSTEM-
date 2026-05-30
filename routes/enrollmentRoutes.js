import express from 'express';
import { enrollmentController } from '../controllers/enrollmentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { enrollmentValidationSchemas } from '../utils/validators.js';

const router = express.Router();

// Protected routes - Students only
router.post(
  '/enroll',
  protect,
  authorize('student'),
  validate(enrollmentValidationSchemas.enrollCourse),
  enrollmentController.enrollCourse
);

router.get(
  '/my-enrollments',
  protect,
  authorize('student'),
  enrollmentController.getMyEnrollments
);

router.get(
  '/:id',
  protect,
  enrollmentController.getEnrollmentById
);

router.put(
  '/:id/progress',
  protect,
  authorize('student'),
  validate(enrollmentValidationSchemas.updateProgress),
  enrollmentController.updateProgress
);

router.put(
  '/:id/status',
  protect,
  authorize('student'),
  validate(enrollmentValidationSchemas.updateStatus),
  enrollmentController.updateCompletionStatus
);

router.get(
  '/:courseId/progress',
  protect,
  authorize('student'),
  enrollmentController.getStudentProgress
);

router.post(
  '/:courseId/drop',
  protect,
  authorize('student'),
  enrollmentController.dropCourse
);

export default router;
