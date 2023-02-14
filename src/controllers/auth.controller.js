
// Login
login = async (req, res) => {
    try {
        return res.render('auth/login', {
            layout: 'layouts/main_auth',
            title: 'Login'
        });
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}

// Store Login
loginProcess = async (req, res) => {
    try {
        res.status(200).send('Berhasil');
    } catch (error) {
        // If Error
        res.status(500).send({error});
    }
}


module.exports = {
    login,
    loginProcess
}