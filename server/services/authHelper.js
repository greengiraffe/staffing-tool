let bcrypt = require('bcryptjs');
let crypto = require('crypto');
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

function ensureAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        req.flash('info', 'Bitte logge dich ein, um die gewünschte Seite zu sehen');
        res.redirect('/login');
    }
}

function passwordIsValid (string) {
    return string && string.search(passwordRegex) !== -1;
}

module.exports = {
    generateSecureHash,
    generateToken,
    comparePassword,
    ensureAuthenticated,
    passwordIsValid
};
