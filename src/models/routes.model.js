module.exports = (sequelize, DataTypes) => {

    const Routes = sequelize.define('tbl_routes', {
        routes_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endpoint: {
            type: DataTypes.STRING
        }
    })

    return Routes
}