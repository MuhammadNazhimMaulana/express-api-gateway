const User = require('../models/user.model');

// JWT Helper
const { createToken } = require('../helper/jwt.helper');

// Crypto JS
const CryptoJS = require('crypto-js');

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

        // Finding User
        const user = await User.findOne({ where: { email: req.body.email } });

        // Checking Email
        if(!user) return res.status(500).send('User Not Found');

        // Hash Password
        let hash = CryptoJS.SHA3(req.body.password);

        // Checking Password
        if(req.body.email != user.email || user.password != hash.toString())
        {
            // Status
            res.status(403);

            throw new Error('Email atau Password Salah')
        }

        // Preparing Token
        const token = createToken(user);

        // Add Auth Token
        res.cookie('AuthToken', token);

        // Update Data
        await User.update(
            {
              token: token,
            },
            {
              where: { email: req.body.email },
            }
        );
        
        res.redirect('/');
    } catch (error) {
        console.log(error);
        // If Error
        res.status(500).send({error});
    }
}

// Logout
logout = async (req, res) => {
    try {

        // Finding User
        const user = await User.findOne({ where: { token: req.user } });

        // Checking Email
        if(!user) return res.status(500).send('User Not Found');

        // Clear Cookie
        res.clearCookie('AuthToken');

        // Update Data
        await User.update(
            {
              token: "",
            },
            {
              where: { token: req.user },
            }
        );
        
        res.redirect('/auth/login');
    } catch (error) {
        console.log(error);
        // If Error
        res.status(500).send({error});
    }
}


module.exports = {
    login,
    loginProcess,
    logout
}