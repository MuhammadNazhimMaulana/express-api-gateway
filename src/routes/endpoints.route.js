// Contoh Routing
const express = require('express');
const router = express.Router();
const { createRouteValidationRules, updateRouteValidationRules, validate } = require('../middleware/validator.middleware')
const { cookie, authenticateJWT } = require('../middleware/auth.middleware')

// Controller
const endpointController = require('../controllers/endpoints.controller');

// Use JWT Check
router.use(cookie, authenticateJWT);

// Index
router.get('/', endpointController.index);

// Create
router.get('/create', endpointController.create);
router.post('/create', createRouteValidationRules(), validate, endpointController.createProcess);

// Update
router.get('/:id', endpointController.update);
router.put('/:id', updateRouteValidationRules(), validate, endpointController.updateProcess);

// Delete
router.delete('/:id', endpointController.deleteProcess);

module.exports = router;