// JWT 
const jwt = require("jsonwebtoken");
const accessTokenSecret = 'secretkeyappearshere';

const authenticateJWT = (req, res, next) => { 
    if (req.user) {
        const token = req.user;
  
        jwt.verify(token, accessTokenSecret, (err) => {
            if (err) {
                res.redirect('/auth/login');
            }

            // Log in Sign
            req.loggedIn = true;

            next();
        });
    } else {
        res.redirect('/auth/login');
    }
  }

const cookie = (req, res, next) => {
    const authToken = req.cookies['AuthToken'];
    req.user = authToken;
    console.log(req.user);
    next();
}
  
  // Exporting modules
module.exports = {
    cookie,
    authenticateJWT
  }