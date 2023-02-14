
// Login
login = async (req, res) => {
    try {
        return res.render('auth/login', {
            layout: 'layouts/main_auth',
            title: 'Halaman Login'
        });
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}


module.exports = {
    login
}