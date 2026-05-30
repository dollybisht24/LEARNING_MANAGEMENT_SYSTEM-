import Joi from 'joi';

export const authValidationSchemas = {
  register: Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('student', 'instructor', 'admin').default('student'),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const courseValidationSchemas = {
  createCourse: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(2000).required(),
    category: Joi.string()
      .valid(
        'web-development',
        'mobile-development',
        'data-science',
        'machine-learning',
        'cloud-computing',
        'devops',
        'cybersecurity',
        'other'
      )
      .required(),
    duration: Joi.number().min(1).required(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced').default('beginner'),
    price: Joi.number().min(0).default(0),
    thumbnail: Joi.string().optional(),
  }),

  updateCourse: Joi.object({
    title: Joi.string().min(3).max(100).optional(),
    description: Joi.string().min(10).max(2000).optional(),
    category: Joi.string()
      .valid(
        'web-development',
        'mobile-development',
        'data-science',
        'machine-learning',
        'cloud-computing',
        'devops',
        'cybersecurity',
        'other'
      )
      .optional(),
    duration: Joi.number().min(1).optional(),
    level: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
    price: Joi.number().min(0).optional(),
    thumbnail: Joi.string().optional(),
  }),
};

export const enrollmentValidationSchemas = {
  enrollCourse: Joi.object({
    courseId: Joi.string().required(),
  }),

  updateProgress: Joi.object({
    progress: Joi.number().min(0).max(100).required(),
  }),

  updateStatus: Joi.object({
    completionStatus: Joi.string()
      .valid('enrolled', 'completed', 'dropped')
      .required(),
  }),
};
