const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const registerRouter = require('../routes/register');
const userRouter = require('../routes/user');
const refreshTokenRouter = require('../routes/refresh-token');
const leaderboardRouter = require('../routes/leaderboard');
const playRouter = require('../routes/play');
const passport = require('passport');
const { init_passport } = require('./passport-cfg');
const { mongo_connect } = require('../db/mongo_connection');
const { connectRedis } = require('../db/redis_connect');

init_passport(passport);

const app = express();
app.use(
    cors({
        origin: 'http://34.227.152.81:5173',
        credentials: true
    })
);
app.use(cookieParser());
app.use(express.json())

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/user', userRouter);
app.use('/refresh-token', refreshTokenRouter);
app.use('/play', playRouter);
app.use('/leaderboard', leaderboardRouter);

connectRedis();
mongo_connect();

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
