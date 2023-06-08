const express = require('express');
const User = require('../models/user');
const { authenticateToken } = require('../server/jwt');

const router = express.Router();

const randomWinLose = () => {
    const win = Math.floor(Math.random() * 2);
    return win;
}

router.get('/', authenticateToken, async (req, res) => {
    const win = randomWinLose();
    const loss = win ? 0 : 1;

    try {

        req.user.wins += win;
        req.user.losses += loss;
        req.user.lastUpdated = Date.now();
        await req.user.save();

        res.status(201).json({ win: win })
    } catch (err) {
        // Error from mongoose
        console.log(err);
        res.status(500)
    }

});

module.exports = router;
