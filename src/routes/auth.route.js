// Contoh Routing
const express = require('express');
const router = express.Router();

// Middleware
const { cookie } = require('../middleware/auth.middleware');

// Controller
const authController = require('../controllers/auth.controller');

// Login
router.get('/login', authController.login);

// Store Login
router.post('/login', authController.loginProcess);

// Logout
router.post('/logout', cookie, authController.logout);

module.exports = router;