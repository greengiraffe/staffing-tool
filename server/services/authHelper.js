let bcrypt = require('bcryptjs');
let crypto = require('crypto');
let passport = require('passport');
let BlacklistedToken = require('../models/blacklistedToken')
let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

function generateSecureHash (string) {
    let salt = bcrypt.genSaltSync();

    return bcrypt.hashSync(string, salt);
}

function generateToken (string) {
    let seed = crypto.randomBytes(20);

    return crypto.createHash('sha1').update(seed + string).digest('hex');
}

function comparePassword (userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function passwordIsValid (string) {
    return string && string.search(passwordRegex) !== -1;
}

function ensureAuthenticated (req, res, next) {
    if (!req.headers.authorization)
        return res.status(401).json({});

    var t = req.headers.authorization.split(' ')[1];
    BlacklistedToken.count({token : t})
    .then(function(result){
        passport.authenticate('bearer', function(err, user, info) {
            if (err) {
                return res.status(401).json(err);
            }
            if (user && !(result > 0)) {
                req.user = user;
                return next();
            } else {
                return res.status(401).json({});
            }
        })(req, res, next);
    })
    .catch(function(err){
        return res.status(500).json(err);
    });
}

module.exports = {
    generateSecureHash,
    generateToken,
    comparePassword,
    ensureAuthenticated,
    passwordIsValid,
};
