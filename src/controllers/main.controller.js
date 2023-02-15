
// Dashboard
index = async (req, res) => {
    try {
        return res.render('dashboard', {
            layout: 'layouts/main',
            title: 'Halaman Dahsboard',
            login: req.loggedIn
        });
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}


module.exports = {
    index
}