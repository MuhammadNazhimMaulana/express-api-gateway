const Route = require('../models/endpoints.model');
const Pagination = require('../helper/pagination.helper');
const {Op} = require("sequelize");

// Index
index = async (req, res) => {
    try {
        // Datas
        const result = await Pagination.paginate(req, res, Route);

        // Return View
        return res.render('endpoints/index', {
            layout: 'layouts/main',
            endpoints: result,
            title: 'Endpoints'
        });

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

// Create
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

module.exports = {
    index,
    create
}