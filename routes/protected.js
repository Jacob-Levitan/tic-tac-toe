const express = require('express');
const { authenticateToken } = require('../server/jwt');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    res.json({ message: "PROTECTED ROUTE" });
});

module.exports = router;
