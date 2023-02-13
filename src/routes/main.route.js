// Contoh Routing
const express = require('express');
const router = express.Router();

// Controller
const mainController = require('../controllers/main.controller');


// Index
router.get('/', mainController.index);

module.exports = router;