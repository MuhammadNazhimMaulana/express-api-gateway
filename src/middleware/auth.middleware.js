// JWT 
const jwt = require("jsonwebtoken");
const accessTokenSecret = 'secretkeyappearshere';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (req.user) {
        const token = req.user;
  
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            next();
        });
    } else {
        res.sendStatus(401);
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