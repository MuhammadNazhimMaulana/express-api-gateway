const Route = require('../models/endpoints.model');
const Pagination = require('../helper/pagination.helper');
const {Op} = require("sequelize");

// Dashboard
index = async (req, res) => {
    try {

        return Pagination.paginate(req, res, Route);
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

module.exports = {
    index,
}