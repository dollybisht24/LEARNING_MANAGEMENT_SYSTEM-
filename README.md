# Learning Management System (LMS) - Backend API

A scalable, production-ready backend API for a Learning Management System built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

## ✨ Features

- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-Based Access Control** - Student, Instructor, and Admin roles
- ✅ **MVC Architecture** - Clean, scalable project structure
- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete courses and enrollments
- ✅ **Course Management** - Create and manage courses with categories and levels
- ✅ **Student Enrollment** - Track student enrollments and progress
- ✅ **Advanced Filtering** - Filter courses by category, instructor, and level
- ✅ **Pagination & Sorting** - Efficient data retrieval
- ✅ **Request Validation** - Input validation with Joi
- ✅ **Security Features** - Helmet, CORS, Rate Limiting
- ✅ **Error Handling** - Centralized error management
- ✅ **Bcrypt Password Hashing** - Secure password storage
- ✅ **Async/Await** - Modern async patterns with try-catch
- ✅ **RESTful APIs** - Standard REST conventions
- ✅ **MongoDB Atlas Ready** - Cloud database integration

---

## 📋 Prerequisites

- Node.js >= 14.x
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Postman (for API testing)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LEARNING\ MANAGEMENT\ SYSTEM\ \(LMS\)
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory:

```env
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms_db?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Start the Server

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

---

## 📁 Project Structure

```
lms-backend-api/
├── config/
│   ├── database.js          # MongoDB connection
│   └── constants.js         # App constants & messages
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── courseController.js  # Course operations
│   └── enrollmentController.js  # Enrollment operations
├── middleware/
│   ├── auth.js              # JWT & authorization
│   ├── logger.js            # Request logging
│   ├── errorHandler.js      # Global error handling
│   └── validate.js          # Request validation
├── models/
│   ├── User.js              # User schema
│   ├── Course.js            # Course schema
│   └── Enrollment.js        # Enrollment schema
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── courseRoutes.js      # Course endpoints
│   └── enrollmentRoutes.js  # Enrollment endpoints
├── services/
│   ├── authService.js       # Auth business logic
│   ├── courseService.js     # Course business logic
│   └── enrollmentService.js # Enrollment business logic
├── utils/
│   ├── responseHandler.js   # Response formatting
│   └── validators.js        # Joi validation schemas
├── app.js                   # Express app setup
├── server.js                # Server entry point
├── package.json             # Dependencies
└── .env.example             # Environment template
```

---

## 🔐 Authentication Flow

### 1. User Registration
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // or "instructor"
}

Response: { user, token }
```

### 2. User Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: { user, token }
```

### 3. Using Token
Include the JWT token in request headers:
```
Authorization: Bearer <your_jwt_token>
```

---

## 👥 User Roles & Permissions

| Role | Permissions |
|------|------------|
| **Student** | Register, Login, Enroll in courses, Track progress, Drop courses |
| **Instructor** | Register, Login, Create courses, Update courses, Delete courses, View students |
| **Admin** | All permissions |

---

## 🛣️ API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/v1/auth/register` | Register new user | ❌ |
| POST | `/api/v1/auth/login` | Login user | ❌ |
| GET | `/api/v1/auth/profile` | Get user profile | ✅ |

### Course Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/api/v1/courses` | Create course | ✅ | Instructor, Admin |
| GET | `/api/v1/courses` | Get all courses | ❌ | - |
| GET | `/api/v1/courses/:id` | Get course by ID | ❌ | - |
| PUT | `/api/v1/courses/:id` | Update course | ✅ | Instructor, Admin |
| DELETE | `/api/v1/courses/:id` | Delete course | ✅ | Instructor, Admin |
| GET | `/api/v1/courses/category/:category` | Get courses by category | ❌ | - |
| GET | `/api/v1/courses/instructor/:instructorId` | Get courses by instructor | ❌ | - |

### Enrollment Endpoints

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/api/v1/enrollments/enroll` | Enroll in course | ✅ | Student |
| GET | `/api/v1/enrollments/my-enrollments` | Get user's enrollments | ✅ | Student |
| GET | `/api/v1/enrollments/:id` | Get enrollment by ID | ✅ | - |
| PUT | `/api/v1/enrollments/:id/progress` | Update progress | ✅ | Student |
| PUT | `/api/v1/enrollments/:id/status` | Update completion status | ✅ | Student |
| GET | `/api/v1/enrollments/:courseId/progress` | Get student progress | ✅ | Student |
| POST | `/api/v1/enrollments/:courseId/drop` | Drop course | ✅ | Student |

---

## 📊 Data Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student, instructor, admin),
  isActive: Boolean,
  enrolledCourses: [ObjectId],
  createdCourses: [ObjectId],
  timestamps: { createdAt, updatedAt }
}
```

### Course Schema
```javascript
{
  title: String (unique),
  description: String,
  instructor: ObjectId (ref: User),
  category: String (web-development, mobile-development, etc.),
  duration: Number (hours),
  level: String (beginner, intermediate, advanced),
  enrolledStudents: [ObjectId],
  price: Number,
  rating: Number (0-5),
  ratingsCount: Number,
  isActive: Boolean,
  thumbnail: String,
  timestamps: { createdAt, updatedAt }
}
```

### Enrollment Schema
```javascript
{
  student: ObjectId (ref: User),
  course: ObjectId (ref: Course),
  progress: Number (0-100),
  completionStatus: String (enrolled, completed, dropped),
  completedAt: Date,
  lastAccessedAt: Date,
  lessons: Array,
  grade: Number (0-100),
  certificateIssued: Boolean,
  timestamps: { createdAt, updatedAt }
}
```

---

## 📝 Example Requests

### Register as Student
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "password": "password123",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@example.com",
    "password": "password123"
  }'
```

### Create Course (Instructor)
```bash
curl -X POST http://localhost:5000/api/v1/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "title": "Learn Node.js",
    "description": "Complete Node.js course from beginner to advanced",
    "category": "web-development",
    "duration": 40,
    "level": "beginner",
    "price": 99
  }'
```

### Enroll in Course (Student)
```bash
curl -X POST http://localhost:5000/api/v1/enrollments/enroll \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "courseId": "course_id_here"
  }'
```

### Get All Courses with Filters
```bash
curl "http://localhost:5000/api/v1/courses?category=web-development&level=beginner&page=1&limit=10"
```

### Update Progress
```bash
curl -X PUT http://localhost:5000/api/v1/enrollments/enrollment_id/progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt_token>" \
  -d '{
    "progress": 50
  }'
```

---

## 🔒 Security Features

- **Helmet.js** - Secures HTTP headers
- **CORS** - Cross-Origin Resource Sharing protection
- **Rate Limiting** - Prevents brute force attacks
- **Bcrypt** - Password hashing with salt rounds
- **JWT** - Secure token-based authentication
- **Input Validation** - Joi schema validation
- **Error Handling** - No stack traces exposed in production

---

## 🚀 Deployment

### Deploy to Render.com

#### Step 1: Prepare Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <github-repo-url>
git push -u origin main
```

#### Step 2: Create Render Account
- Go to [render.com](https://render.com)
- Sign up and connect your GitHub

#### Step 3: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: lms-backend-api
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free tier available

#### Step 4: Add Environment Variables
Add these in Render Dashboard:
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Your JWT secret key
- `NODE_ENV` - Set to "production"
- `CORS_ORIGIN` - Your frontend URL

#### Step 5: Deploy
Push to GitHub - Render will automatically deploy!

---

## 📖 Documentation

- [API Documentation](./API_DOCUMENTATION.md) - Complete endpoint reference
- [Deployment Guide](./DEPLOYMENT.md) - Step-by-step deployment instructions
- [Development Guide](./DEVELOPMENT.md) - Local development setup

---

## 📊 Performance Optimization

- **Database Indexing** - Indexes on frequently queried fields
- **Pagination** - Reduce data transfer with pagination
- **Sorting** - Efficient sorting with MongoDB
- **Connection Pooling** - Mongoose handles connection pools
- **Caching** - Implement Redis (future enhancement)
- **Compression** - gzip compression via middleware

---

## 🐛 Troubleshooting

### Connection Error
```
✗ MongoDB Connection Error
```
**Solution:** Check `MONGODB_URI` in `.env` file

### Invalid Token
```
{
  "success": false,
  "message": "Unauthorized access"
}
```
**Solution:** Ensure token is valid and not expired. Re-login if needed.

### Already Enrolled
```
{
  "success": false,
  "message": "Student already enrolled in this course"
}
```
**Solution:** Student cannot enroll twice in the same course

### Rate Limited
```
{
  "success": false,
  "message": "Too many requests from this IP"
}
```
**Solution:** Wait before making more requests

---

## 📚 Testing with Postman

1. Import the provided Postman collection
2. Set environment variables:
   - `base_url`: http://localhost:5000
   - `token`: (Set after login)
   - `student_id`: (Create a student user)
   - `course_id`: (Create a course)
3. Run the test collection

---

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements.

---

## 📄 License

This project is licensed under the MIT License.

---

## 📧 Support

For issues and questions, please open an issue in the repository.

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [RESTful API Design](https://restfulapi.net/)

---

**Happy Coding! 🚀**
