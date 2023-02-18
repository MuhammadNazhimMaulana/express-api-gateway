const Route = require('../models/endpoints.model');
const Pagination = require('../helper/pagination.helper');
const {Op} = require("sequelize");

// Validation
const { validationResult } = require('express-validator');

// Index
index = async (req, res) => {
    try {
        // Datas
        const result = await Pagination.paginate(req, res, Route);

        // Return View
        return res.render('endpoints/index', {
            layout: 'layouts/main',
            endpoints: result,
            success: req.flash('success'),
            errors: req.flash('errors'),
            title: 'Endpoints'
        });

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

// Create View
create = async (req, res) => {
    try {
        // Return View
        return res.render('endpoints/create', {
            layout: 'layouts/main',
            title: 'Endpoints'
        });

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

// Create Process
createProcess = async (req, res) => {
    try {
        // Konstanta errors
        const errors = validationResult(req);

        // Kalau error
        if(errors.isEmpty())
        {
            // Get Data
            let data = {
                routes_name: req.body.routes_name,
                endpoint: req.body.endpoint
            }
            
            // Process Create
            await Route.create(data);

            // Flash Session
            req.flash('success', 'Endpoint Added');
        }else{
            // Flash Session
            req.flash('errors', errors.errors);
        }

        // Return      
        res.redirect('/endpoint');

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

// Update View
update = async (req, res) => {
    try {

        // Finding User
        const route = await Route.findOne({ where: { id: req.params.id } });

        // Return View
        return res.render('endpoints/update', {
            layout: 'layouts/main',
            data: route,
            title: 'Endpoints'
        });

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

// Create Process
updateProcess = async (req, res) => {
    try {
        // Konstanta errors
        const errors = validationResult(req);

        // Kalau error
        if(errors.isEmpty())
        {
            // Get Data
            let data = {
                routes_name: req.body.routes_name,
                endpoint: req.body.endpoint
            }
            
            // Process Create
            await Route.update(data, { where: { id: req.params.id } });

            // Flash Session
            req.flash('success', 'Endpoint Updated');
        }else{
            // Flash Session
            req.flash('errors', errors.errors);
        }

        // Return      
        res.redirect('/endpoint');

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

module.exports = {
    index,
    create,
    update,
    createProcess,
    updateProcess
}