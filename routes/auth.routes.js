const express = require('express');
const { register } = require('../controllers/auth.controller');

// import all controllers
// import SessionController from './app/controllers/SessionController';

const router = express.Router();

router.post('/register', register);

module.exports = router;
