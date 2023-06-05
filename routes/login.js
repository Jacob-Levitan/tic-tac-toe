const express = require('express');
const { append } = require('express/lib/response');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const read_secret = require('../server/secret_reader');
const JWT_SECRET = read_secret('jwt_secret');
const { generateAccessToken, generateRefreshToken } = require('../server/jwt');

router.post('/', passport.authenticate('local', { session: false, }),
    (req, res) => {
        const accessToken = generateAccessToken(req.body.email);
        const refreshToken = generateRefreshToken(req.body.email);

        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
        res.json( { accessToken } ).status(200);
    });

module.exports = router;
