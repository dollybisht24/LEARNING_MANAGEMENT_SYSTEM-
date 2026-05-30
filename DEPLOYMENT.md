# LMS Backend API - Deployment Guide

## ☁️ Deployment to Render.com

### Prerequisites
- GitHub account with repository
- MongoDB Atlas account
- Render account

---

## Step 1: Prepare MongoDB Atlas

### 1.1 Create MongoDB Atlas Account
- Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Sign up for free account
- Create organization and project

### 1.2 Create Cluster
1. Click "Build a Database"
2. Choose "M0 Free" tier
3. Select cloud provider (AWS recommended)
4. Create cluster (takes ~3-5 minutes)

### 1.3 Create Database User
1. Go to "Database Access"
2. Click "Add New Database User"
3. Set username and password
4. Assign roles: `readWriteAnyDatabase`
5. Copy connection string format

### 1.4 Whitelist IP
1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (for development)
4. Or add specific Render IP

### 1.5 Get Connection String
1. Click "Connect"
2. Choose "Drivers"
3. Copy MongoDB connection string
4. Replace `<username>`, `<password>`, `<cluster>`

**Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/lms_db?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial LMS Backend commit"

# Create repo on GitHub and add remote
git remote add origin https://github.com/YOUR_USERNAME/lms-backend-api.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy on Render

### 3.1 Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" button
3. Select "Web Service"

### 3.2 Connect Repository
1. Click "Connect account" (GitHub)
2. Authorize Render
3. Select `lms-backend-api` repository
4. Click "Connect"

### 3.3 Configure Service

**Basic Settings:**
- **Name:** `lms-backend-api`
- **Region:** Select closest to users
- **Branch:** `main`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Plan:** Free tier available

### 3.4 Add Environment Variables

Click "Advanced" and add these variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `PORT` | `5000` |
| `NODE_ENV` | `production` |
| `JWT_SECRET` | Generate secure random string (32+ chars) |
| `JWT_EXPIRE` | `7d` |
| `CORS_ORIGIN` | Your frontend URL (e.g., https://lms-frontend.onrender.com) |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | `100` |

### 3.5 Generate JWT Secret
```bash
# On your local machine
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically:
   - Build the project
   - Install dependencies
   - Start the server
3. Monitor "Logs" tab for any errors

**Deployment typically takes 5-10 minutes**

---

## Step 5: Verify Deployment

### 5.1 Check Health
```bash
curl https://lms-backend-api.onrender.com/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### 5.2 Update Postman Collection
- Change `base_url` to `https://lms-backend-api.onrender.com`
- Test authentication endpoints

### 5.3 Test Full Flow
1. Register new user
2. Login
3. Copy JWT token
4. Create course (as instructor)
5. Enroll in course (as student)

---

## 🔄 Continuous Deployment

Render automatically redeploys when you push to main branch:

```bash
# Make changes locally
git add .
git commit -m "Feature: Add new API endpoint"
git push origin main

# Render automatically deploys within 1-2 minutes
```

---

## 🐛 Troubleshooting

### Build Failed
- Check logs in Render dashboard
- Verify `package.json` has all dependencies
- Ensure Node version is 18+

### MongoDB Connection Error
- Verify connection string is correct
- Check MongoDB Atlas IP whitelist
- Test connection locally first

### 502 Bad Gateway
- Check application logs
- Verify environment variables
- Check MongoDB connection

### Rate Limiting Issues
- Adjust `RATE_LIMIT_MAX_REQUESTS` higher
- Or increase `RATE_LIMIT_WINDOW_MS`

---

## 📊 Monitoring

### Render Logs
- View in Render dashboard
- Filter by time
- Search for errors

### Database Monitoring
- Check MongoDB Atlas dashboard
- Monitor connection count
- Check storage usage

---

## 🔐 Production Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Set NODE_ENV to "production"
- [ ] Whitelist MongoDB IP or use connection from Render IP
- [ ] Set CORS_ORIGIN to frontend domain
- [ ] Enable HTTPS (automatic with Render)
- [ ] Test all API endpoints
- [ ] Monitor error logs
- [ ] Set up error alerts

---

## 💰 Cost Optimization

**Free Tier Includes:**
- 750 compute hours/month
- Shared CPU
- Auto-sleeps after 15 minutes inactivity

**Upgrade to Paid:**
- $7/month for dedicated resources
- No auto-sleep
- Better performance

---

## 🚀 Future Enhancements

- [ ] Implement caching with Redis
- [ ] Add email notifications
- [ ] Implement file upload (AWS S3)
- [ ] Add analytics dashboard
- [ ] Implement search functionality
- [ ] Add payment integration

---

## 📞 Support

For issues:
1. Check application logs
2. Review MongoDB connection
3. Test locally with Docker
4. Check Render documentation

---

**Happy Deploying! 🎉**
