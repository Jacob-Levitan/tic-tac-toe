const express = require('express');
const { authenticateToken } = require('../server/jwt');
const User = require('../models/user');
const router = express.Router();
const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,20}$/;
const NON_NEG_NUMBER_REGEX = /^\d+$/;
const MY_ERRORS = ["bad role", "username unavailable", "bad username", "bad number"]

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

        if (existingUsername) {
            res.status(403).json({ message: "Username not available" });
            throw "username unavailable"
        }

        if (!USERNAME_REGEX.test(req.body.username)) {
            res.status(400).json({ message: "Invalid username" });
            throw "bad username"
        }

        req.user.username = req.body.username;
    } catch (err) {
        throw err;
    }
}

function updateWins(req, res) {
    try {
        if (!NON_NEG_NUMBER_REGEX.test(req.body.wins)) {
            res.status(400).json({ message: "Wins must be non-negative whole number" });
            throw "bad number";
        }
    } catch (err) {
        throw err;
    }

    req.user.wins = req.body.wins;
}

function updateLosses(req, res) {
    try {
        if (!NON_NEG_NUMBER_REGEX.test(req.body.losses)) {
            res.status(400).json({ message: "Losses must be non-negative whole number" });
            throw "bad number";
        }
    } catch (err) {
        throw err;
    }

    req.user.losses = req.body.losses;
}

async function updateUser(req, res) {
    try {
        await req.user.save();
    } catch (err) {
        throw err;
    }
}

function checkRole(req, res) {
    if ((req?.body?.wins || req?.body?.losses) && !req.user.roles.includes('editor')) {
        res.status(403).json({ message: "Must have editor role" });
        throw "bad role";
    }
}

router.put('/', authenticateToken, async (req, res) => {

    try {
        checkRole(req, res);

        if (req?.body?.username)
            await updateUsername(req, res);

        if (req?.body?.wins)
            updateWins(req, res);

        if (req?.body?.losses)
            updateLosses(req, res);

        await updateUser(req, res);

        return res.sendStatus(200);

    } catch (err) {
        if (!MY_ERRORS.includes(err)) {
            console.log(err);
            res.sendStatus(500);
        }
    }
});

module.exports = router;
