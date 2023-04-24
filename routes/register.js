const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('register.ejs');
});

module.exports = router;
