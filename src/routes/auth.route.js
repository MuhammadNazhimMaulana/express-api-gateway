// Contoh Routing
const express = require('express');
const router = express.Router();

// Controller
const authController = require('../controllers/auth.controller');


// Login
router.get('/login', authController.login);

module.exports = router;