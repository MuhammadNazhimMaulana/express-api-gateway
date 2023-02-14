const { Sequelize, DataTypes } = require('sequelize');

// Env
require('dotenv').config()

const mysql = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

// Connection
mysql.authenticate().then(() => {
    console.log('Connected to Database');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}

db.Sequelize = Sequelize;
db.mysql = mysql;

// Calling Schemas
db.routes = require('../models/routes.model')(mysql, DataTypes);

db.mysql.sync({ force: false })
.then(() => {
    console.log('synchronization');
})

module.exports = db;