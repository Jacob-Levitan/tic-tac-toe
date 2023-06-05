const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
// const User = require('../models/user');
const { generateAccessToken } = require('../server/jwt');
const read_secret = require('../server/secret_reader');
const JWT_REFRESH_SECRET = read_secret('jwt_refresh_secret');
let refreshTokens = require('../db/refresh-tokens');

router.get('/', (req, res) => {
    const refreshToken = req?.cookies?.jwt

    if (!refreshToken) return res.status(401);

    if (!(refreshTokens.includes(refreshToken))) return res.status(403);

    if (refreshTokens.includes(refreshToken)) {
        try {
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
            const newToken = generateAccessToken(decoded.email);
            res.json({ accessToken: newToken }).status(200);
        } catch {
            return res.sendStatus(403);
        }
    };
})

module.exports = router;
