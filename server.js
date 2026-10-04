const dotenv = require('dotenv');
// Load environment variables
dotenv.config();

const connectDB = require('./developer/src/config/db');
const app = require('./developer/src/app');

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`
  );
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
