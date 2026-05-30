export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
};

export const ENROLLMENT_STATUS = {
  ENROLLED: 'enrolled',
  COMPLETED: 'completed',
  DROPPED: 'dropped',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  USER_NOT_FOUND: 'User not found',
  UNAUTHORIZED_ACCESS: 'Unauthorized access',
  COURSE_NOT_FOUND: 'Course not found',
  ENROLLMENT_NOT_FOUND: 'Enrollment not found',
  ALREADY_ENROLLED: 'Student already enrolled in this course',
  VALIDATION_ERROR: 'Validation error',
  INTERNAL_SERVER_ERROR: 'Internal server error',
};

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'User created successfully',
  LOGIN_SUCCESS: 'Login successful',
  COURSE_CREATED: 'Course created successfully',
  COURSE_UPDATED: 'Course updated successfully',
  COURSE_DELETED: 'Course deleted successfully',
  ENROLLMENT_SUCCESS: 'Enrollment successful',
  PROGRESS_UPDATED: 'Progress updated successfully',
};
