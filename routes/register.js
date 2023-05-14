const express = require('express');
const { append } = require('express/lib/response');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { checkNotAuthenticated } = require('../server/jwt');
// const { mongo_connect, mongo_disconnect } = require('../db/connection');

const router = express.Router();
const NUM_HASHES = 10;

router.post('/', checkNotAuthenticated, async (req, res) => {
    try {
        // await mongo_connect();

        const existingUsername = await User.getUserByUsername(req.body.username);
        if (existingUsername) {
            res.status(403).json({ message: "Username already exists!" });
            return;
        }
        const existingEmail = await User.getUserByEmail(req.body.email);
        if (existingEmail) {
            res.status(403).json({ message: "Email already exists!" });
            return;
        }

        // TODO: Consider changing from NUM_HASHES to salt
        const hashedPassword = await bcrypt.hash(req.body.password, NUM_HASHES);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            hashedPw: hashedPassword,
            userCreatedDate: Date.now(),
            wins: 0,
            losses: 0
        });

        try {
            const newUser = await user.save();
            console.log(newUser);
        } catch (err) {
            // Error saving to DB
            console.log(err);
            res.status(400).json({ message: err.message });
        }
        // Return successful registration
        res.status(201).json({ message: "success" })
        // await mongo_disconnect();
    } catch (err) {
        // Error from bcrypt or mongo_connect/disconnect
        console.log(err);
        res.status(500)
    }

});

module.exports = router;
