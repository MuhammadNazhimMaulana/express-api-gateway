const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db.config');

const Routes = db.define('tbl_endpoints', {
    routes_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endpoint: {
        type: DataTypes.STRING
    }
},
{
    freezeTableName: true
}
)

module.exports = Routes;

(async() => {
    await db.sync();
})();