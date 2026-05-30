# LMS Backend API - Complete API Documentation

## Base URL
```
Development: http://localhost:5000/api/v1
Production: https://lms-backend-api.onrender.com/api/v1
```

---

## 🔐 Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

---

## 📌 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

### Paginated Response
```json
{
  "success": true,
  "message": "Data retrieved",
  "data": [ /* array of items */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## 🔑 AUTHENTICATION ENDPOINTS

### 1. Register User
**POST** `/auth/register`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // or "instructor"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student",
      "createdAt": "2024-01-20T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Validation Rules
- name: 2-50 characters
- email: Valid email format, unique
- password: Minimum 6 characters
- role: "student" or "instructor" (default: student)

---

### 2. Login User
**POST** `/auth/login`

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### Error Responses
- 400: Missing email or password
- 401: Invalid email or password

---

### 3. Get User Profile
**GET** `/auth/profile`

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Response (200)
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "enrolledCourses": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Learn Node.js",
        "description": "Complete Node.js course",
        "category": "web-development"
      }
    ],
    "createdCourses": []
  }
}
```

---

## 📚 COURSE ENDPOINTS

### 1. Create Course
**POST** `/courses`

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "title": "Learn Node.js and Express",
  "description": "Complete course on building scalable backend applications",
  "category": "web-development",
  "duration": 40,
  "level": "beginner",
  "price": 99,
  "thumbnail": "https://example.com/image.jpg"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "Course created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Learn Node.js and Express",
    "description": "Complete course on building scalable backend applications",
    "instructor": "507f1f77bcf86cd799439011",
    "category": "web-development",
    "duration": 40,
    "level": "beginner",
    "enrolledStudents": [],
    "price": 99,
    "rating": 0,
    "ratingsCount": 0,
    "isActive": true,
    "createdAt": "2024-01-20T10:30:00.000Z"
  }
}
```

#### Required Fields
- title: 3-100 characters
- description: 10-2000 characters
- category: web-development, mobile-development, data-science, machine-learning, cloud-computing, devops, cybersecurity, other
- duration: Minimum 1 hour

#### Authorization
- Instructor or Admin only

---

### 2. Get All Courses
**GET** `/courses`

#### Query Parameters
```
page=1&limit=10&sort=-createdAt&category=web-development&level=beginner&search=node
```

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| page | number | 1 | Page number for pagination |
| limit | number | 10 | Results per page |
| sort | string | -createdAt | Sort field (prefix - for descending) |
| category | string | - | Filter by course category |
| level | string | - | Filter by level |
| instructor | string | - | Filter by instructor ID |
| search | string | - | Search in title and description |

#### Response (200)
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Learn Node.js",
      "description": "Complete Node.js course",
      "instructor": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Instructor",
        "email": "instructor@example.com"
      },
      "category": "web-development",
      "duration": 40,
      "level": "beginner",
      "price": 99,
      "rating": 4.5,
      "enrolledStudents": 15,
      "createdAt": "2024-01-20T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

---

### 3. Get Course by ID
**GET** `/courses/:id`

#### URL Parameters
- id: Course ID (MongoDB ObjectId)

#### Response (200)
```json
{
  "success": true,
  "message": "Course retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Learn Node.js",
    "description": "Complete Node.js course",
    "instructor": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Instructor",
      "email": "instructor@example.com",
      "role": "instructor"
    },
    "category": "web-development",
    "duration": 40,
    "level": "beginner",
    "enrolledStudents": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Alice Student",
        "email": "alice@example.com"
      }
    ],
    "price": 99,
    "rating": 4.5,
    "ratingsCount": 10,
    "isActive": true,
    "createdAt": "2024-01-20T10:30:00.000Z",
    "updatedAt": "2024-01-20T10:30:00.000Z"
  }
}
```

---

### 4. Update Course
**PUT** `/courses/:id`

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "title": "Advanced Node.js",
  "price": 149,
  "level": "advanced"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Course updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Advanced Node.js",
    "price": 149,
    "level": "advanced",
    "updatedAt": "2024-01-20T11:30:00.000Z"
  }
}
```

#### Authorization
- Instructor (must be creator) or Admin only

---

### 5. Delete Course
**DELETE** `/courses/:id`

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Response (200)
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

#### Authorization
- Instructor (must be creator) or Admin only

---

### 6. Get Courses by Category
**GET** `/courses/category/:category`

#### URL Parameters
- category: web-development, mobile-development, data-science, etc.

#### Query Parameters
- page (default: 1)
- limit (default: 10)

#### Response (200)
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [
    { /* course objects */ }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

---

### 7. Get Courses by Instructor
**GET** `/courses/instructor/:instructorId`

#### URL Parameters
- instructorId: Instructor's user ID

#### Query Parameters
- page (default: 1)
- limit (default: 10)

#### Response (200)
```json
{
  "success": true,
  "message": "Courses retrieved successfully",
  "data": [ /* course objects */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

---

## 👥 ENROLLMENT ENDPOINTS

### 1. Enroll in Course
**POST** `/enrollments/enroll`

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "courseId": "507f1f77bcf86cd799439012"
}
```

#### Response (201)
```json
{
  "success": true,
  "message": "Enrollment successful",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "student": "507f1f77bcf86cd799439013",
    "course": "507f1f77bcf86cd799439012",
    "progress": 0,
    "completionStatus": "enrolled",
    "completedAt": null,
    "lastAccessedAt": "2024-01-20T10:30:00.000Z",
    "grade": null,
    "certificateIssued": false,
    "createdAt": "2024-01-20T10:30:00.000Z"
  }
}
```

#### Error Responses
- 404: Course not found
- 409: Student already enrolled in this course

#### Authorization
- Student only

---

### 2. Get My Enrollments
**GET** `/enrollments/my-enrollments`

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### Query Parameters
- page (default: 1)
- limit (default: 10)

#### Response (200)
```json
{
  "success": true,
  "message": "Enrollments retrieved successfully",
  "data": [
    {
      "_id": "507f1f77bcf86cd799439014",
      "student": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Alice Student",
        "email": "alice@example.com"
      },
      "course": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Learn Node.js",
        "description": "Complete Node.js course",
        "category": "web-development",
        "duration": 40
      },
      "progress": 45,
      "completionStatus": "enrolled",
      "lastAccessedAt": "2024-01-20T10:30:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "pages": 1
  }
}
```

#### Authorization
- Student only

---

### 3. Get Enrollment by ID
**GET** `/enrollments/:id`

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### URL Parameters
- id: Enrollment ID

#### Response (200)
```json
{
  "success": true,
  "message": "Enrollment retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "student": { /* user object */ },
    "course": { /* course object */ },
    "progress": 45,
    "completionStatus": "enrolled",
    "grade": 85,
    "certificateIssued": false,
    "createdAt": "2024-01-20T10:30:00.000Z"
  }
}
```

---

### 4. Update Progress
**PUT** `/enrollments/:id/progress`

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "progress": 75
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Progress updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "progress": 75,
    "lastAccessedAt": "2024-01-20T11:30:00.000Z",
    "completionStatus": "enrolled"
  }
}
```

#### Validation
- Progress: 0-100
- Auto-completes course when progress reaches 100

#### Authorization
- Student only (must own enrollment)

---

### 5. Update Completion Status
**PUT** `/enrollments/:id/status`

#### Headers
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

#### Request Body
```json
{
  "completionStatus": "completed"
}
```

#### Response (200)
```json
{
  "success": true,
  "message": "Progress updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "completionStatus": "completed",
    "completedAt": "2024-01-20T11:30:00.000Z",
    "progress": 100
  }
}
```

#### Valid Statuses
- enrolled
- completed
- dropped

#### Authorization
- Student only (must own enrollment)

---

### 6. Get Student Progress
**GET** `/enrollments/:courseId/progress`

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### URL Parameters
- courseId: Course ID

#### Response (200)
```json
{
  "success": true,
  "message": "Progress retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "student": "507f1f77bcf86cd799439013",
    "course": {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Learn Node.js",
      "duration": 40
    },
    "progress": 75,
    "completionStatus": "enrolled",
    "lastAccessedAt": "2024-01-20T11:30:00.000Z",
    "grade": 85
  }
}
```

#### Authorization
- Student only

---

### 7. Drop Course
**POST** `/enrollments/:courseId/drop`

#### Headers
```
Authorization: Bearer <jwt_token>
```

#### URL Parameters
- courseId: Course ID

#### Response (200)
```json
{
  "success": true,
  "message": "Course dropped successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "completionStatus": "dropped"
  }
}
```

#### Authorization
- Student only

---

## 🏥 HEALTH CHECK

### Server Status
**GET** `/health`

#### Response (200)
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

---

## ⚠️ ERROR CODES

| Code | Message | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid token |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists |
| 500 | Internal Error | Server error |

---

## 🔒 Authorization Roles

| Endpoint | Student | Instructor | Admin |
|----------|---------|-----------|-------|
| Register | ✅ | ✅ | ✅ |
| Login | ✅ | ✅ | ✅ |
| Create Course | ❌ | ✅ | ✅ |
| Update Course | ❌ | ✅* | ✅ |
| Delete Course | ❌ | ✅* | ✅ |
| Enroll Course | ✅ | ❌ | ❌ |
| Get Progress | ✅ | ❌ | ❌ |
| Update Progress | ✅ | ❌ | ❌ |

*Must be course creator

---

## 📋 Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per IP

Response when limited:
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again later."
}
```

---

## 🔐 JWT Token Structure

```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "userId": "507f1f77bcf86cd799439011",
  "role": "student",
  "iat": 1705761000,
  "exp": 1706366000
}

Signature: HMAC(SECRET)
```

---

**Last Updated:** January 2024
