const express = require('express');
const {
  register,
  login,
  getMe,
  forgotPassword,
} = require('../controllers/auth.controller');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = express.Router();

const { protect } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgotpassword', forgotPassword);

module.exports = router;
