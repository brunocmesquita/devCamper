const express = require('express');
const { register, login } = require('../controllers/auth.controller');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
