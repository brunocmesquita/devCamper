const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

// Route files
const bootcampsRouter = require('./routes/bootcamps.routes.js');

const PORT = process.env.PORT || 5000;

// Load env vars
dotenv.config({ path: './config/config.env' });
console.log(dotenv.config({ path: './config/config.env' }));

const app = express();

// Dev loggin middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);

app.listen(PORT, () => {
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
