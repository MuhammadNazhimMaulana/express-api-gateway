// Contoh Routing
const express = require('express');
const router = express.Router();

// Controller
const endpointController = require('../controllers/endpoints.controller');

// Index
router.get('/', endpointController.index);

module.exports = router;