/**
 * Created by siri on 2017-01-11.
 */
const PassportLocalStrategy = require('passport-local').Strategy;
import User from './../models/user';

/**
 * Return the Passport Local Strategy object.
 */
export default new PassportLocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
}, (req, email, password, done) => {
    const userData = {
        email: email.trim(),
        password: password.trim(),
        name: req.body.name.trim()
    };

    const newUser = new User(userData);
    newUser.save((err) => {
        if (err) { return done(err); }

        return done(null);
    });
});