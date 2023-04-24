const express = require('express');
const app = express();
const loginRouter = require('../routes/login');
const registerRouter = require('../routes/register');
const passport = require('passport')
const flash = require('express-flash');
const session = require('express-session');
const { init_passport, checkAuthenticated } = require('./passport-cfg');
const read_secret = require('./secret_reader');
const { getUserByEmail, getUserById } = require('../db/users');
const session_secret = read_secret('session_secret');


init_passport(passport, getUserByEmail, getUserById);


app.set('view-engine', 'ejs');
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

app.get('/', checkAuthenticated, (req, res) => {
    res.render('server.ejs', { name: req.user.name });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
