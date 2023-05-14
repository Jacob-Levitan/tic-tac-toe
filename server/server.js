const express = require('express');
const cors = require('cors');
const loginRouter = require('../routes/login');
const logoutRouter = require('../routes/logout');
const registerRouter = require('../routes/register');
const protectedRouter = require('../routes/protected')
const passport = require('passport')
const { init_passport } = require('./passport-cfg');

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
app.use(passport.initialize());

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);
app.use('/protected', protectedRouter);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
