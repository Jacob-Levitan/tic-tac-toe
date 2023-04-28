const express = require('express');
const { authenticateToken } = require('../server/jwt');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.render('homepage.ejs', { email: req.email });
});

module.exports = router;
