const express = require('express');
const { authenticateToken } = require('../server/jwt');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    // console.log(req.user)
    const user = req.user;
    res.json({ username: user.username,
               email: user.email,
               wins: user.wins,
               losses: user.losses });
});

module.exports = router;
