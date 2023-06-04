const jwt = require('jsonwebtoken');
const User = require('../models/user');
const read_secret = require('./secret_reader');
const JWT_SECRET = read_secret('jwt_secret');
const JWT_REFRESH_SECRET = read_secret('jwt_refresh_secret');
let refreshTokens = require('../db/refresh-tokens');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    /* If authHeader exists, token will be 2nd element of the array after space */
    const token = authHeader && authHeader.split(' ')[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.getUserByEmail(decoded.email);
            next();
        } catch {
            res.status(401).json("Invalid token");
        }
    } else {
        res.status(400).json("Not authorized, no token");
    }
}

function generateAccessToken(email) {
    /* TODO: Change this to _id? */
    return jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' })
}

function generateRefreshToken(email) {
    /* TODO: Change this to _id? */
    const refreshToken = jwt.sign({ email }, JWT_REFRESH_SECRET, { expiresIn: '1d' })
    refreshTokens.push(refreshToken);

    return refreshToken;
}

module.exports = { authenticateToken, generateAccessToken, generateRefreshToken };
