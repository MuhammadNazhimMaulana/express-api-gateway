const Route = require('../models/endpoints.model');

// Dashboard
index = async (req, res) => {
    try {

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

module.exports = {
    index,
}