const express = require('express');
const { append } = require('express/lib/response');
const passport = require('passport');
const router = express.Router();
const { checkNotAuthenticated } = require('../server/passport-cfg');

router.get('/', checkNotAuthenticated, (req, res) => {
    res.sendFile('/usr/app/views/login.html');
});

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
