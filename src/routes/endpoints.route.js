// Contoh Routing
const express = require('express');
const router = express.Router();
const { cookie, authenticateJWT } = require('../middleware/auth.middleware')

// Controller
const endpointController = require('../controllers/endpoints.controller');

// Use JWT Check
router.use(cookie, authenticateJWT);

// Index
router.get('/', endpointController.index);

module.exports = router;