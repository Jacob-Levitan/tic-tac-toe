const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy


function init_passport(passport) {
    const authenticate_user = async(email, password, done) => {
        const user = await User.getUserByEmail(email);
        if (!user) {
            return done( null, null, { message: 'No user with that email' } );
        }

        try {
            if (await bcrypt.compare(password, user.hashedPw)) {
                return done(null, user);
            }
            else {
                return done( null, null, { message: 'Incorrect password' } );
            }
        } catch (err) {
            done(err)
        }
    }
    passport.use(new LocalStrategy( { usernameField: 'email', passwordField: 'password' },
                authenticate_user));

    passport.serializeUser((user, done) => {
        done(null, user.username)
    });

    passport.deserializeUser((username, done) => {
        return done(null, username);
    });
}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

    next();
}

module.exports = { init_passport, checkAuthenticated, checkNotAuthenticated } ;
