const express = require('express');
const router = express.Router();
let refreshTokens = require('../db/refresh-tokens');

router.post('/',  (req, res) => {
    const refreshToken = req?.cookies?.jwt;

    /* Nothing to clear */
    if (!refreshToken) return res.status(204);    //GETTING STUCK HERE!

    let tokenIndex = refreshTokens.indexOf(refreshToken);
    /* If refreshToken found */
    if (tokenIndex !== -1)
        refreshTokens.splice(tokenIndex, 1);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: false });

    res.sendStatus(204);
});

module.exports = router;
