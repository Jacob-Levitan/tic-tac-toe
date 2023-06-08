const express = require('express');
const { append } = require('express/lib/response');
const passport = require('passport');
const router = express.Router();
const read_secret = require('../server/secret_reader');
const { generateAccessToken, generateRefreshToken } = require('../server/jwt');
const User = require('../models/user');

router.post('/', passport.authenticate('local', { session: false, }),
    async (req, res) => {
        try {
            const accessToken = generateAccessToken(req.body.email);
            const refreshToken = await generateRefreshToken(req.body.email);

            const user = await User.getUserByEmail(req.body.email);

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.json( { accessToken: accessToken, roles: user.roles } ).status(200);
        } catch (err) {
            console.log(err);
            res.status(500);
        }
    });

module.exports = router;
