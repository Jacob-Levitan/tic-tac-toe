const express = require('express');
const { append } = require('express/lib/response');
const passport = require('passport');
const router = express.Router();
const { checkNotAuthenticated } = require('../server/passport-cfg');

router.post('/', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;
