// Contoh Routing
const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/auth.controller');


// Login
router.get('/login', authController.login);

// Store Login
router.post('/login', authController.loginProcess);

module.exports = router;