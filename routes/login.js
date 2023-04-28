const express = require('express');
const { append } = require('express/lib/response');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const read_secret = require('../server/secret_reader');
const JWT_SECRET = read_secret('jwt_secret');
const { checkNotAuthenticated } = require('../server/jwt');

router.get('/', checkNotAuthenticated, (req, res) => {
    res.sendFile('/usr/app/views/login.html');
});

router.post('/', checkNotAuthenticated,
    passport.authenticate('local', {
    session: false,
    // successRedirect: '/homepage',
    failureRedirect: '/login'
    }),
    (req, res) => {
        const accessToken = jwt.sign(req.body.email, JWT_SECRET);
        res.json({ accessToken: accessToken});
    });

module.exports = router;
