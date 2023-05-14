const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const registerRouter = require('../routes/register');
const passport = require('passport')
const flash = require('express-flash');
const session = require('express-session');
const { init_passport, checkAuthenticated } = require('./passport-cfg');
const read_secret = require('./secret_reader');
const session_secret = read_secret('session_secret');


init_passport(passport);

const app = express();
app.use(express.json())
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
