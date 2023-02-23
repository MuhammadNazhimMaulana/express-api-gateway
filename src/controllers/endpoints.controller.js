const Route = require('../models/endpoints.model');
const Pagination = require('../helper/pagination.helper');
const {Op} = require("sequelize");
const {setupRateLimit} = require("../config/ratelimit.config");
const {setupProxies} = require("../config/proxy.config");
const app = require("../app");

// Validation
const { validationResult } = require('express-validator');

// Index
index = async (req, res) => {
    try {
        // Datas
        const result = await Pagination.paginate(req, res, Route);

        // Redirects Data
        const redirects = await getAll();
        
        // Rate Limit
        setupRateLimit(req.app, redirects);

        // Routes Gateway
        setupProxies(req.app, redirects);

        // Return View
        return res.render('endpoints/index', {
            layout: 'layouts/main',
            endpoints: result,
            success: req.flash('success'),
            destroy: req.flash('destroy'),
            errors: req.flash('errors'),
            title: 'Endpoints'
        });

    } catch (error) {
        console.log(error);
        // If Error
        res.status(500).send({error});
    }
}

// All
getAll = async (req, res) => {
    try {
        // Preparing Array
        let data = [];

        // Datas
        const result = await Route.findAll();

        // Looping
        for(const val of result) {
            data.push({
                url: val.endpoint,
                auth: false,
                creditCheck: false,
                rateLimit: {
                    windowMs: 15 * 60 * 1000,
                    max: 5
                },
                proxy: {
                    target: "https://www.google.com",
                    changeOrigin: true,
                    pathRewrite: {
                        [`^${val.endpoint}`]: '',
                    },
                }
            })
        }

        // Return View
        return (data);

    } catch (error) {
        // If Error
        console.log(error);
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

// Update Process
updateProcess = async (req, res) => {
    try {
        // Konstanta errors
        const errors = validationResult(req);

        // Kalau tidak ada error
        if(errors.isEmpty())
        {
            // Get Data
            let data = {
                routes_name: req.body.routes_name,
                endpoint: req.body.endpoint
            }
            
            // Process Update
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

// Delete Process
deleteProcess = async (req, res) => {
    try {
        
        // Process Delete
        await Route.destroy({ where: { id: req.params.id } });

        // Flash Session
        req.flash('destroy', 'Endpoint Deleted');

        // Return      
        res.redirect('/endpoint');

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

module.exports = {
    index,
    getAll,
    create,
    update,
    createProcess,
    updateProcess,
    deleteProcess
}