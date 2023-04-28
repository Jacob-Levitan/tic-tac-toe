const express = require('express');
const homepageRouter = require('../routes/homepage');
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const registerRouter = require('../routes/register');
const passport = require('passport')
const { init_passport } = require('./passport-cfg');

init_passport(passport);

const app = express();
app.set('view-engine', 'html');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.use('/homepage', homepageRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);

app.get('/', (req, res) => {
    res.status(201).redirect('/homepage');
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
