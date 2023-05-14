const express = require('express');
const passport = require('passport');
const router = express.Router();
const { checkAuthenticated } = require('../server/passport-cfg');

router.post('/', checkAuthenticated, (req, res, next) => {
    req.logout(err => {
        if (err) { return next(err); }
        res.redirect('/');
    })
});

module.exports = router;
