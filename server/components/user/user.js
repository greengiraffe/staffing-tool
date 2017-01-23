let User = require('../../models/user');
let Project = require('../../models/project');
let Skill = require('../../models/skill');
let BlacklistedToken = require('../../models/blacklistedToken');
let authHelper = require('../../services/authHelper');
let jwt = require('jsonwebtoken');

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
            role: role,
        });
        return new Promise(function(resolve, reject) {
            user.save(function(err, result) {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });

        });
    },

    updateUser: function(updateData) {
        //TODO Protect Password and Email from being updated
        return new Promise(function(resolve, reject) {
            User.findByIdAndUpdate(updateData._id, { $set: updateData}, function(err, user) {
                if(err) {
                    reject({statusCode: 500, obj: err});
                } else if(!user) {
                    reject({
                        message: "No user document for " + updateData._id,
                        statusCode: 400
                    })
                }
                else {
                    resolve({message: "User updated successfully"});
                }
            });
        });
    },

    changePassword: function(id, updatedPassword) {
        return new Promise(function(resolve, reject) {
            User.findByIdAndUpdate(id, {$set: {password: updatedPassword}}, function(err, user){
                if(err) {
                    reject(err);
                } else {
                    resolve({message: "Password updated successfully"});
                }
            });
        });
    },

    deleteUser: function(id) {
        return new Promise (function(resolve, reject) {
            User.remove({_id : id}, function(err, result) {
                if(err) {
                    reject({statusCode: 500, obj: err});
                } else if(result.result.n == 0) {
                    reject({
                        message: "No user document for " + id,
                        statusCode: 400
                    });
                } else {
                    resolve(result);
                }
            });
        });
    },

    listUsers: function() {
        return User
            .find({})
            .populate('userSkills.skill')
            .exec();
    },

    getUserByID: function(id) {
        return User
            .findById(id)
            .populate('userSkills.skill')
            .exec();
    },

    getUserByMail: function(mail) {
        return User.findOne({email : mail}).exec();
    },

    getOwnedProjects(userId) {
        return Project.find({creator: userId}).exec();
    },

    listProjectsTasks(userId) {
        return Project
            .find({}, {projectTasks: 1, client: 1, title: 1})
            .populate('projectTasks.requiredSkills')
            .populate('projectTasks.assignedUsers', '-password -email -__v -role')
            .exec();
    },

    //Todo: Review...push on sub document
    addSkill: function(userId, skillId, rating) {

        return new Promise(function(resolve, reject) {
            Skill.findById(skillId, function(skillErr, skill) {
                if(skillErr) {
                    reject({statusCode: 500, obj: skillErr});
                } else if(!skill) {
                   reject({
                        message : "No skill document for " + skillId,
                        statusCode: 400
                    });
                } else {

                    User.findById(userId, function(err, user) {
                        if(err) {
                            reject({statusCode: 500, obj: err});
                        } else if (!user) {
                            reject({
                                message : "No user document for " + userId,
                                statusCode: 400
                            });
                        } else if(-1 !== user.userSkills.findIndex((skill) => skill.skill == skillId)) {
                            reject({
                                message: "Skill already exists for user " + userId,
                                statusCode: 400,
                            });
                        } else {
                            user.userSkills.push({skill: skillId, rating: rating});

                            user.save(function(err) {
                                if(err) {
                                    reject({statusCode: 500, obj: err});
                                } else {
                                    resolve(user);
                                }
                            });

                        }
                    });

                }
            })
        });
    },

    removeSkill: function(userId, skillId) {
        return new Promise(function(resolve, reject) {
            User.update(
                { '_id' : userId },
                {   $pull : { "userSkills" : { skill: skillId }}},
                { safe : true },
                function callback(err, obj) {
                    if(err) {
                        reject({statusCode: 500, obj: err});
                    } else if(obj.nModified == 0) {
                        reject({
                            message: "No matching documents",
                            statusCode: 400
                        });
                    } else {
                        resolve(obj);
                    }
                }
            );
        })
    },

    addTokenToBlacklist: function(token) {
        let decoded = jwt.decode(token, {complete: true});
        let expDate = new Date(decoded.payload.exp * 1000);

        let blacklistedToken = new BlacklistedToken({
            token: token,
            expireAt: expDate
        })

        return new Promise(function(resolve, reject) {
            blacklistedToken.save(function(err, result) {
                if(err) {
                    reject();
                } else {
                  resolve();
                }
            });
        });
    }

};
