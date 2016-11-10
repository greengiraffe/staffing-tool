// Get Users Model
let Users      = require('../../models/user');
let authHelper = require('../../services/authHelper');


module.exports = {

    /**
     * Find a user based on his ID
     * @param {Number} id The user's ID
     * @return {Promise<User, Error>} The user object
     */
    findById: function (id) {
        return Users.findOne(
            {_id: id},
            function(err, result) {
                if (err) {res.send(err)}
            }
        );
    },

    /**
     * Find a user based on his E-Mail
     * @param {String} email The user's E-Mail
     * @return {Promise<User, Error>} The user object
     */
    findByEmail: function (email) {
        return knex('users').where('email', email).first()
    },

    /**
     * Create a new user based on his E-Mail with a hashed password and authToken
     * @param {String} email The user's E-Mail
     * @param {String} password The raw (unhashed) password
     * @return {Promise<User, Error>} An array containing only the new created user object
     */
    create: function (email, password) {
        return knex('users')
            .insert({
                email: email,
                password: authHelper.generateSecureHash(password),
                auth_token: authHelper.generateToken(email)
            })
            .returning('*')
    },

    /**
     * Find a user based on his ID and update his password with a new generated hash
     * @param {Number} id The user's ID
     * @param {String} password The raw (unhashed) password
     * @return {Promise<User, Error>} An array containing only the updated user object
     */
    updatePassword: function (id, password) {
        return knex('users')
            .where('id', id)
            .update('password', authHelper.generateSecureHash(password))
            .returning('*')
    },

    /**
     * Find a user based on his ID and set a token and timestamp for the password reset function
     * @param {String} id The user's ID
     * @param {String} token Necessary to identify the request later on
     * @return {Promise<User, Error>} An array containing only the updated user object
     */
    setResetPasswordExpiration: function (id, token) {
        return knex('users')
            .where('id', id)
            .update({
                'pw_reset_token': token,
                'pw_reset_requested_at': knex.raw('CURRENT_TIMESTAMP')
            })
            .returning('*')
    },

    /**
     * Find a user based on the pw_reset_token. Returns nothing if token can't be found or if it's expired.
     * @param {String} token The token which the password reset has been requested with initially
     * @return {Promise<User, Error>} The user object
     */
    findUserWithValidResetToken: function (token) {
        // return knex('users')
            // .whereRaw('pw_reset_token = ? AND pw_reset_requested_at > CURRENT_TIMESTAMP - INTERVAL '1 hour'', token)
            // .first()
    },

    /**
     * Search for a row containing the same authToken and set the emailVerified attribute of the corresponding user to true
     * @param {String} authToken The authToken that should be searched for
     * @return {Promise<User, Error>} An array containing only the updated user object
     */
    verifyEmail: function (authToken) {
        return knex('users')
            .where('auth_token', authToken)
            .update('email_verified', true)
            .returning('*')
    }
};
