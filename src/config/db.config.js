const { Sequelize } = require('sequelize');

// Env
require('dotenv').config()

const db = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD,

  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

(async() => {
  await db.sync({ force: true });
})();

module.exports = db;