// Get Users Model
let User       = require('../../models/user');
let authHelper = require('../../services/authHelper');

module.exports = {

    createUser: function(
                    firstName,
                    lastName,
                    email,
                    password,
                    location,
                    role
    ) {
        let user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: authHelper.generateSecureHash(password),
            location: location,
            role: role
        });
        return new Promise(function(reject, resolve) {
            user.save(function(result, err) {
                if(err) { reject(err) }
                else { resolve(result) }
            });

        });
    },

    deleteUser: function(id) {
        return new Promise (function(resolve, reject) {
            User.remove({_id : id}, function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    if(result.result.n == 0) {
                        reject(null);
                    } else {
                        resolve(result);
                    }
                }
            });
        });
    },

    listUsers: function() {
        return User.find().exec();
    },

    getUserByID: function(id) {
        User.findById(id).exec();
    },

    getUserByMail: function(mail) {
        User.findOne().exec();
    }

    // activateUser: function(id) {
    //     User.findByIdAndUpdate id,
    //         result.register = false;
    //         result.save(function(err, result) {
    //             if (err) {return -1}
    //             return true;
    //         })
    //     })
    // }

    // //Todo: Review...push on sub document
    // addSkill: function(id, skillId, rating) {
    //     User.findByIdAndUpdate(
    //         id,
    //         {$push: {userSkill: {skill: skillId, rating: rating}}},
    //         function(err, result) {
    //             if (err) {return -1}
    //             return true;
    //         }
    //     );
    // },
    //
    // // Todo: Review...pull on sub document
    // removeSkill: function(id, skillId) {
    //     User.findByIdAndUpdate(
    //         id,
    //         {$pull: {userSkill: {skill: skillId}}},
    //         function(err, result) {
    //             if (err) {return -1}
    //             return true;
    //         }
    //     );
    // }

};
