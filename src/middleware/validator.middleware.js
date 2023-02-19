const { body, validationResult, check } = require('express-validator');

// Models
const Route = require('../models/endpoints.model');

// Validation For Create
const createRouteValidationRules = () => {
  return [
    check('endpoint', 'Endpoint Tidak Valid').isString(),

    // Custom Validation
    body('routes_name').custom(async (value) => {

      // Cek Duplikatnya
      const duplicate = await Route.findOne({ where: { routes_name: value } });
      
      // If there is a duplicate
      if(duplicate){
          throw new Error('Route Sudah ada');
      }   
          
      return true;

    })
  ]
}

// Validation For Update
const updateRouteValidationRules = () => {
  return [
    check('endpoint', 'Endpoint Tidak Valid').isString(),

    // Custom Validation
    body('routes_name').custom(async (value, { req }) => {

      // Cek Duplikatnya
      const duplicate = await Route.findOne({ where: { routes_name: value } });

      // If there is a duplicate
      if(duplicate){
        if(duplicate.id != req.params.id){
          throw new Error('Route Sudah ada');
        }
      }   
          
      return true;

    })
  ]
}

// Sending Error (Whether Error exist or not)
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return next()
}

// Exporting modules
module.exports = {
  createRouteValidationRules,
  updateRouteValidationRules,
  validate
}