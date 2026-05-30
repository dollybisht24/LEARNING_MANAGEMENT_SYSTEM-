import express from 'express';
import { authController } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authValidationSchemas } from '../utils/validators.js';

const router = express.Router();

// Public routes
router.post(
  '/register',
  validate(authValidationSchemas.register),
  authController.register
);

router.post(
  '/login',
  validate(authValidationSchemas.login),
  authController.login
);

// Protected routes
router.get('/profile', protect, authController.getProfile);

export default router;
