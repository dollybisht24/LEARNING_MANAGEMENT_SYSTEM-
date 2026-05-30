# Development Guide

## 🚀 Quick Start

### 1. Local Development Setup

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# For local MongoDB:
# MONGODB_URI=mongodb://localhost:27017/lms_db

# Start development server with hot reload
npm run dev
```

### 2. Using Docker Compose (Optional)

```bash
# Build and start all services (MongoDB + API)
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### 3. Verify Server is Running

```bash
curl http://localhost:5000/health
```

---

## 📝 Development Workflow

### Adding New Features

1. **Create Database Model**
   ```bash
   # models/YourModel.js
   ```

2. **Create Service Layer**
   ```bash
   # services/yourService.js
   ```

3. **Create Controller**
   ```bash
   # controllers/yourController.js
   ```

4. **Create Routes**
   ```bash
   # routes/yourRoutes.js
   ```

5. **Register in app.js**
   ```javascript
   import yourRoutes from './routes/yourRoutes.js';
   app.use('/api/v1/your-path', yourRoutes);
   ```

---

## 🧪 Testing

### Manual Testing with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "student"
  }'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Using Postman

1. Import `postman-collection.json`
2. Set `base_url` to `http://localhost:5000`
3. Set `token` after login
4. Run requests

---

## 📊 Database Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String (hashed),
  role: String,
  enrolledCourses: [ObjectId],
  createdCourses: [ObjectId]
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  instructor: ObjectId,
  category: String,
  duration: Number,
  level: String,
  enrolledStudents: [ObjectId],
  price: Number,
  rating: Number,
  isActive: Boolean
}
```

### Enrollment Model
```javascript
{
  student: ObjectId,
  course: ObjectId,
  progress: Number (0-100),
  completionStatus: String,
  completedAt: Date,
  grade: Number
}
```

---

## 🔧 Common Tasks

### Reset MongoDB

```bash
# Local MongoDB
mongo
use lms_db
db.dropDatabase()
```

### View Logs

```bash
# Combined logs
npm run dev

# Or in separate terminal
docker-compose logs -f api
```

### Add New Validation Schema

Edit `utils/validators.js`:
```javascript
export const yourValidationSchema = {
  yourEndpoint: Joi.object({
    field1: Joi.string().required(),
    field2: Joi.number().min(0).max(100),
  }),
};
```

---

## 💡 Best Practices

1. **Always validate input** - Use Joi schemas
2. **Use try-catch** - Handle all errors gracefully
3. **Log important events** - Use logger middleware
4. **Separate concerns** - Keep models, services, controllers separate
5. **Use environment variables** - Never hardcode secrets
6. **Add error handling** - Use errorHandler middleware
7. **Test API endpoints** - Use Postman collection

---

## 🔐 Security Tips

1. **Change JWT_SECRET** - Use strong random value
2. **Update dependencies** - Run `npm update`
3. **Use HTTPS** - Enable on production
4. **Validate all input** - Never trust client data
5. **Hash passwords** - Use bcrypt (already implemented)
6. **Use rate limiting** - Already configured
7. **CORS protection** - Already configured

---

## 📦 Dependencies Overview

| Package | Purpose |
|---------|---------|
| express | Web framework |
| mongoose | MongoDB ODM |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT tokens |
| helmet | Security headers |
| cors | CORS middleware |
| express-rate-limit | Rate limiting |
| joi | Input validation |
| dotenv | Environment variables |

---

## 🚨 Troubleshooting

### "Cannot find module" Error
```bash
npm install
```

### MongoDB Connection Failed
```bash
# Check MongoDB is running
# Update MONGODB_URI in .env
```

### Port 5000 Already in Use
```bash
# Find and kill process
lsof -i :5000
kill -9 <PID>
```

### JWT Token Invalid
- Token may have expired
- JWT_SECRET might have changed
- Use current token from login

---

**Happy Coding! 🎉**
