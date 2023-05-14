const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy

function init_passport(passport) {
    const authenticate_user = async(email, password, done) => {
        try {
            const user = await User.getUserByEmail(email);
            /* If email doesn't exist or password doesn't match */
            if (!user || !(await bcrypt.compare(password, user.hashedPw))) {
                return done( null, null, { message: 'Incorrect email or password' } );
            }
            else {
                /* Email exists and password matches */
                return done(null, user);
            }
        } catch (err) {
            done(err)
        }
    }
    passport.use(new LocalStrategy( { usernameField: 'email', passwordField: 'password' },
                authenticate_user));
}

module.exports = { init_passport } ;
