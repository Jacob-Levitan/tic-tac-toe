const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../server/jwt');

router.post('/', /*checkAuthenticated,*/ (req, res) => {
    res.json({ accessToken: '', refreshToken: '' })
    res.status(200);
});

module.exports = router;
