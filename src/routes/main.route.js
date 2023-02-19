// Contoh Routing
const express = require('express');
const { cookie, authenticateJWT } = require('../middleware/auth.middleware')
const router = express.Router();

// Controller
const mainController = require('../controllers/main.controller');

// Use JWT Check
router.use(cookie, authenticateJWT);

// Index
router.get('/', mainController.index);

module.exports = router;