// Get Users Model
let User       = require('../../models/user');
let authHelper = require('../../services/authHelper');

module.exports = {

    createUser: function(
                    firstname,
                    lastname,
                    email,
                    password,
                    location,
                    role
    ) {
        let user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: authHelper.generateSecureHash(password),
            location: location,
            role: role
        });
        return user.save();

        // return user.save(function(err, result) {
        //     if (err) {return -1}
        //     return result._id;
        // }).exec();
    },

    listUsers: function() {
        // User.find({}, function(err, result) {
        //     if (err) {return -1}
        //     return result;
        // })
        return User.find().exec();
    },

    getUserByID: function(id) {
        User.findById(id, function(err, result){
            if (err) {return -1}
            return result;
        })
    },

    getUserByMail: function(mail) {
        User.findOne({email: mail}, function(err, result) {
            if (err) {return -1}
            return result;
        })
    },

    activateUser: function(id) {
        User.findById(id, function(err, result) {
            if (err) {return -1}
            result.register = false;
            result.save(function(err, result) {
                if (err) {return -1}
                return true;
            })
        })
    },

    //Todo: Review...push on sub document
    addSkill: function(id, skillId, rating) {
        User.findByIdAndUpdate(
            id,
            {$push: {userSkill: {skill: skillId, rating: rating}}},
            function(err, result) {
                if (err) {return -1}
                return true;
            }
        );
    },

    // Todo: Review...pull on sub document
    removeSkill: function(id, skillId) {
        User.findByIdAndUpdate(
            id,
            {$pull: {userSkill: {skill: skillId}}},
            function(err, result) {
                if (err) {return -1}
                return true;
            }
        );
    }

};
