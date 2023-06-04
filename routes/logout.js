const express = require('express');
const passport = require('passport');
const router = express.Router();
const { checkAuthenticated } = require('../server/jwt');

router.post('/', /*checkAuthenticated,*/ (req, res) => {
    res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: "Log out succeeded" });
});

module.exports = router;
