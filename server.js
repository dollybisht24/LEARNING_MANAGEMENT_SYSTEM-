import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Connect to database
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`\n${'='.repeat(50)}`);
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ API URL: http://localhost:${PORT}/api/v1`);
      console.log(`${'='.repeat(50)}\n`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
