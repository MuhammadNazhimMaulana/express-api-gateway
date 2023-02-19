const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Users = db.define('tbl_users', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true
}
)

module.exports = Users;