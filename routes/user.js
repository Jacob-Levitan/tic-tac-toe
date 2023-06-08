const express = require('express');
const { authenticateToken } = require('../server/jwt');
const User = require('../models/user');

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
    const user = req.user;
    res.json({ username: user.username,
               email: user.email,
               wins: user.wins,
               losses: user.losses });
});

async function updateUsername(req, res) {
    try {
        const existingUsername = await User.getUserByUsername(req.body.username);

        if (existingUsername) return res.sendStatus(403);

        req.user.username = req.body.username;
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

function updateWins(req, res) {
    req.user.wins = req.body.wins;
}

function updateLosses(req, res) {
    req.user.losses = req.body.losses;
}

async function updateUser(req, res) {
    try {
        await req.user.save();
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

function checkRole(req, res) {
    if ((req?.body?.wins || req?.body?.losses) && !req.user.roles.includes('editor'))
        return res.sendStatus(401);
}

router.put('/', authenticateToken, async (req, res) => {
    checkRole(req, res);

    if (req?.body?.username)
        await updateUsername(req, res);

    if (req?.body?.wins)
        updateWins(req, res);

    if (req?.body?.losses)
        updateLosses(req, res);

    await updateUser(req, res);

    return res.sendStatus(200);
});

module.exports = router;
