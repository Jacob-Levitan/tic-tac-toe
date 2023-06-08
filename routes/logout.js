const express = require('express');
const router = express.Router();
const { redisClient } = require('../db/redis_connect');

router.post('/', (req, res) => {
    const refreshToken = req?.cookies?.jwt;

    /* Nothing to clear */
    if (!refreshToken) return res.status(204);

    redisClient.del(refreshToken);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });

    res.sendStatus(204);
});

module.exports = router;
