let passport = require('passport');
var bearerStrategy = require('passport-http-bearer').Strategy;
let jwt = require('jsonwebtoken');
let config = require('../../config/config');

let setupPassport = function () {

    passport.use('bearer', new bearerStrategy( function(token, cb) {
        jwt.verify(token, config.jwt.secret, function(err, decoded) {
            if (err) {
                return cb(err);
            }

            let user = decoded.user
            if (!user) {
                return cb(null, false);
            }

            return cb(null, user);
        });
    }));

};

module.exports = setupPassport;
