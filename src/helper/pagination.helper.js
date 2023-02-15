const {Op} = require("sequelize");

// Dashboard
paginate = async (req, res, model) => {
    try {
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const offset = limit * page;
        const totalRows = await model.count({
            where:{
                [Op.or]: [{routes_name:{
                    [Op.like]: '%'+search+'%'
                }}]
            }
        });

        const totalPage = Math.ceil(totalRows / limit);
        const result = await model.findAll({
            where:{
                [Op.or]: [{routes_name:{
                    [Op.like]: '%'+search+'%'
                }}]
            },
            offset: offset,
            limit: limit,
            order:[
                ['id', 'DESC']
            ]   
        })

        return res.json({
            result: result,
            page:page,
            limit: limit,
            totalPage: totalPage,
            totalRows: totalRows
        });

    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

module.exports = {
    paginate,
}