const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xssClean = require('xss-clean');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect do database
connectDB();

// Route files
const bootcampsRouter = require('./routes/bootcamps.routes.js');
const coursesRouter = require('./routes/courses.routes.js');
const authRouter = require('./routes/auth.routes.js');
const usersRouter = require('./routes/users.routes.js');
const reviewsRouter = require('./routes/reviews.routes.js');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xssClean());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);
app.use('/api/v1/courses', coursesRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
