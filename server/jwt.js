const jwt = require('jsonwebtoken');
const read_secret = require('./secret_reader');
const JWT_SECRET = read_secret('jwt_secret');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    /* If authHeader exists, token will be 2nd element of the array after space */
    const token = authHeader && authHeader.split(' ')[1];

    // if (!token) return res.sendStatus(401);
    if (!token) return res.redirect('/login');

    jwt.verify(token, JWT_SECRET, (err, email) => {
        /* Token no longer valid */
        if (err) return res.sendStatus(403);

        req.email = email;
        next();
    });
}

function checkNotAuthenticated(req, res, next) {
    const authHeader = req.headers['authorization'];
    /* If authHeader exists, token will be 2nd element of the array after space */
    const token = authHeader && authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err) => {
        if (!err) return res.redirect('/homepage');
    });

    next();
}

module.exports = { authenticateToken, checkNotAuthenticated };
