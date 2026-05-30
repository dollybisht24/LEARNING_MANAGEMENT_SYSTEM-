# 🚀 LMS Backend API - Quick Start Guide

## 🎯 What You Have

A complete, production-ready Learning Management System backend built with:
- **Node.js + Express.js** - Backend framework
- **MongoDB + Mongoose** - Database
- **JWT + Bcrypt** - Security
- **Docker** - Containerization
- **Render Ready** - Cloud deployment

---

## ⚡ 5-Minute Setup

### Step 1: Install Dependencies
```bash
cd "/home/sama/LEARNING MANAGEMENT SYSTEM (LMS)"
npm install
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

### Step 3: Update .env with Your MongoDB URI
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms_db?retryWrites=true&w=majority
```

### Step 4: Start Server
```bash
npm run dev
```

### Step 5: Test Health Check
```bash
curl http://localhost:5000/health
```

✅ **Server is running!**

---

## 📚 Key Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Main documentation & overview |
| **API_DOCUMENTATION.md** | Complete API endpoint reference |
| **DEPLOYMENT.md** | Deploy to Render.com |
| **DEVELOPMENT.md** | Local development guide |
| **PROJECT_SUMMARY.md** | Project statistics & features |
| **postman-collection.json** | Import to Postman for testing |

---

## 🧪 Test the API

### Option 1: Using Postman (Recommended)
1. Download Postman
2. Import `postman-collection.json`
3. Set `base_url` = `http://localhost:5000`
4. Run the test requests

### Option 2: Using cURL
```bash
# Register Student
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@test.com","password":"pass123","role":"student"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@test.com","password":"pass123"}'
```

---

## 🗂️ Project Structure

```
LMS-Backend/
├── 📄 Core Files
│   ├── app.js               - Express application
│   ├── server.js            - Server entry point
│   └── package.json         - Dependencies
│
├── 🔧 Configuration
│   └── config/
│       ├── database.js      - MongoDB connection
│       └── constants.js     - App constants
│
├── 🎮 API Layer
│   ├── controllers/         - Request handlers (3 files)
│   ├── routes/              - API endpoints (3 files)
│   └── middleware/          - Middleware (4 files)
│
├── 💾 Data Layer
│   ├── models/              - Database schemas (3 files)
│   └── services/            - Business logic (3 files)
│
├── 🛠️ Utilities
│   ├── utils/               - Helper functions (2 files)
│   └── middleware/          - Express middleware (4 files)
│
└── 📚 Documentation
    ├── README.md
    ├── API_DOCUMENTATION.md
    ├── DEPLOYMENT.md
    ├── DEVELOPMENT.md
    └── PROJECT_SUMMARY.md
```

---

## 🔐 Authentication Flow

### 1. Register (Any Role)
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "Your Name",
  "email": "email@example.com",
  "password": "securePassword123",
  "role": "student"  // or "instructor"
}
```

### 2. Login
```bash
POST /api/v1/auth/login
{
  "email": "email@example.com",
  "password": "securePassword123"
}

Returns: { user, token }
```

### 3. Use Token
```bash
Authorization: Bearer <your_jwt_token>
```

---

## 📚 Main Features

✅ **User Management**
- Registration & Login
- Role-based access (Student, Instructor, Admin)
- Password hashing with bcrypt

✅ **Course Management**
- Create/Read/Update/Delete courses
- Filter by category, instructor, level
- Pagination & sorting

✅ **Student Enrollment**
- Enroll in courses
- Track progress (0-100%)
- Drop courses
- View certificates

✅ **Security**
- JWT authentication
- Rate limiting (100 req/15min)
- Input validation with Joi
- CORS protection
- Helmet security headers

---

## 🚀 19 API Endpoints

### Authentication (3)
- `POST /auth/register` - Register user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get profile

### Courses (7)
- `POST /courses` - Create course
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get course details
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course
- `GET /courses/category/:category` - Filter by category
- `GET /courses/instructor/:id` - Filter by instructor

### Enrollments (7)
- `POST /enrollments/enroll` - Enroll in course
- `GET /enrollments/my-enrollments` - Get my courses
- `GET /enrollments/:id` - Get enrollment details
- `PUT /enrollments/:id/progress` - Update progress
- `PUT /enrollments/:id/status` - Update status
- `GET /enrollments/:courseId/progress` - View progress
- `POST /enrollments/:courseId/drop` - Drop course

### Health (1)
- `GET /health` - Server status

---

## 🐳 Docker Support

### Run with Docker Compose
```bash
# Start MongoDB + API
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

---

## ☁️ Deploy to Render

1. Push code to GitHub
2. Connect GitHub to Render
3. Add environment variables:
   - `MONGODB_URI` - Your MongoDB Atlas URI
   - `JWT_SECRET` - Strong secret key
   - `NODE_ENV` - Set to "production"
4. Deploy! 🚀

See **DEPLOYMENT.md** for detailed steps.

---

## 🔧 Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Start production server
npm start
```

---

## 📊 Tech Stack

| Component | Technology |
|-----------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js 4+ |
| Database | MongoDB |
| ODM | Mongoose 7+ |
| Authentication | JWT |
| Password Hash | Bcryptjs |
| Validation | Joi |
| Security | Helmet, CORS, Rate-Limit |
| Containerization | Docker |

---

## 🎯 Example Usage

### Create an Instructor Account
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Prof. Anderson",
    "email": "prof@example.com",
    "password": "secure123",
    "role": "instructor"
  }'
```

### Create a Course
```bash
curl -X POST http://localhost:5000/api/v1/courses \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "React for Beginners",
    "description": "Learn React basics",
    "category": "web-development",
    "duration": 30,
    "level": "beginner",
    "price": 99
  }'
```

### Enroll in Course
```bash
curl -X POST http://localhost:5000/api/v1/enrollments/enroll \
  -H "Authorization: Bearer <student-token>" \
  -H "Content-Type: application/json" \
  -d '{"courseId": "<course-id>"}'
```

---

## ❓ Common Questions

**Q: Do I need MongoDB locally?**
A: No! Use MongoDB Atlas (cloud) or Docker Compose includes MongoDB.

**Q: How do I deploy?**
A: Push to GitHub → Connect to Render → Done! Auto-deploys on push.

**Q: Is this production-ready?**
A: Yes! Includes security, error handling, logging, and validation.

**Q: How many API calls can I make?**
A: 100 requests per 15 minutes per IP (configurable).

**Q: Can I modify the code?**
A: Absolutely! It's your code. Modify as needed.

---

## 📖 More Info

- **Full API Docs:** See `API_DOCUMENTATION.md`
- **Deployment Steps:** See `DEPLOYMENT.md`
- **Development Setup:** See `DEVELOPMENT.md`
- **Project Overview:** See `PROJECT_SUMMARY.md`

---

## 🆘 Troubleshooting

### Server won't start?
```bash
# Check if MongoDB URI is correct
# Check if port 5000 is available
lsof -i :5000
```

### API endpoints not working?
```bash
# Check if server is running
curl http://localhost:5000/health

# Check environment variables
cat .env
```

### MongoDB connection error?
```bash
# Verify MongoDB URI
# Check IP whitelist in MongoDB Atlas
# Test connection locally
```

---

## 🎉 You're All Set!

Your LMS Backend API is ready to use!

**Next Steps:**
1. ✅ Install dependencies (`npm install`)
2. ✅ Setup .env file
3. ✅ Start server (`npm run dev`)
4. ✅ Import Postman collection
5. ✅ Test API endpoints
6. ✅ Deploy to Render

---

**Happy Coding! 🚀**

For detailed documentation, see README.md and other guide files.
