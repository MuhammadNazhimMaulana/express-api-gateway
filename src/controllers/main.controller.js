
// Dashboard
index = async (req, res) => {
    try {
        return res.render('dashboard', {
            layout: 'layouts/main',
            title: 'Halaman Dahsboard'
        });
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}


module.exports = {
    index
}