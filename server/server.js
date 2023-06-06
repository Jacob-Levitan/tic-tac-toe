const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const registerRouter = require('../routes/register');
const userRouter = require('../routes/user');
const refreshTokenRouter = require('../routes/refresh-token');
const passport = require('passport')
const { init_passport } = require('./passport-cfg');

init_passport(passport);

const Redis = require('redis');
const redisClient = Redis.createClient({
    legacyMode: true,
    socket: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST
    }
});

async function testConnect() {
    await redisClient.connect();
    await redisClient.set('name', 'zach');
}

testConnect();

const app = express();
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(cookieParser());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/user', userRouter);
app.use('/refresh-token', refreshTokenRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
