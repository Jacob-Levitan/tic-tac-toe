const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('', async (req, res) => {
    try {
        const sortedUsers = await User.find().sort({ wins: 'descending' }).select('username wins losses -_id');

        res.status(200).json({ leaders: sortedUsers });

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
});

module.exports = router;
