const express = require('express');
const dotenv = require('dotenv');

// Route files
const bootcampsRouter = require('./routes/bootcamps.routes.js');

const PORT = process.env.PORT || 5000;
// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();
const logger = (req, res, next) => {
  req.hello = 'Hello World';
  console.log('Middleware ran');
  next();
};
app.use(logger);
// Mount routers
app.use('/api/v1/bootcamps', bootcampsRouter);

app.listen(PORT, () => {
  console.log(
    ` Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
