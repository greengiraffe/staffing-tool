let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let JwtStrategy = require('passport-jwt').Strategy;
let extractJwt = require('passport-jwt').ExtractJwt;

let authHelper = require('./authHelper');
let User = require('../components/user/user');

let setupPassport = function () {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((mail, done) => {
        User.getUserByMail(mail)
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err, null);
            });
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {
        User.getUserByMail(email)
            .then((user) => {

                if (!user) {
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }

                if (authHelper.comparePassword(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false,
                        req.flash('message', 'Invalid Password'));
                }
            })
            .catch((err) => {
                return done(err);
            });
    }));

    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: extractJwt.fromAuthHeader(),
        secretOrKey: 'abc',
    }, function(payload, done) {
        User.getUserByID(payload.sub)
            .then((user) => {
                done(null, user);
            })
            .catch(err => done(err, false));
    }))
};

module.exports = setupPassport;
