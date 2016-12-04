// Get Users Model
let User = require('../../models/user');
let Skill = require('../../models/skill');
let authHelper = require('../../services/authHelper');

module.exports = {

    createUser: function(
                    firstName,
                    lastName,
                    email,
                    password,
                    location,
                    role,
                    picture
    ) {
        let user = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: authHelper.generateSecureHash(password),
            location: location,
            role: role,
            picture: picture
        });
        return new Promise(function(resolve, reject) {
            user.save(function(err, result) {
                if(err) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else {
                    resolve({
                        message : "User created successfully",
                        statusCode: 201,
                        obj: result
                    });
                }
            });

        });
    },

    updateUser: function(updateData) {
        //TODO Protect Password and Email from being updated
        return new Promise(function(resolve, reject) {
            User.findByIdAndUpdate(updateData._id, { $set: updateData}, function(err, user) {
                if(err) {
                    reject({
                        message: "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(!user) {
                    reject({
                        message: "No user document for " + updateData._id,
                        statusCode: 404
                    })
                }
                else {
                    resolve();
                }
            });
        });
    },

    changePassword: function(id, updatedPassword) {
      return new Promise(function(resolve, reject) {
        User.findByIdAndUpdate(id, {$set: {password: updatedPassword}}, function(err, user){
          if(err) {
              reject({
                  message: "Database error",
                  statusCode: 500,
                  obj: err
              });
          } else if(!user) {
              reject({
                  message: "No user document for " + id,
                  statusCode: 404
              })
          }
          else {
              resolve();
          }
        })
      });
    },
    deleteUser: function(id) {
        return new Promise (function(resolve, reject) {
            User.remove({_id : id}, function(err, result) {
                if(err) {
                    reject({
                        message: "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(result.result.n == 0) {
                    reject({
                        message: "No user document for " + id,
                        statusCode: 404
                    });
                } else {
                    resolve({
                        message: "User deleted successfully",
                        statusCode: 200
                    });
                }
            });
        });
    },

    listUsers: function() {
        return User.find().exec();
    },

    getUserByID: function(id) {
        return User.findById(id).exec();

        // return new Promise(function(resolve, reject) {
        //     User.findById(id, function(err, result) {
        //         if (err) { reject(err) }
        //         else { resolve(result) }
        //     });
        // });
    },

    getUserByMail: function(mail) {
        return User.findOne({email : mail}).exec();

        // return new Promise(function(resolve, reject) {
        //     User.findOne({email: mail}, function(err, result) {
        //         if (err) {
        //             console.log("error");
        //             reject(err) }
        //         else {
        //             resolve(result) }
        //     });
        // });
    },

    addImg: function(id, picture) {
        User.findByIdAndUpdate(
            id,
            {picture : picture},
            function(err, result) {
                  if (err) {return -1}
                  return true;
            }
        );
    },

    // activateUser: function(id) {
    //     User.findByIdAndUpdate id,
    //         result.register = false;
    //         result.save(function(err, result) {
    //             if (err) {return -1}
    //             return true;
    //         })
    //     })
    // }

    //Todo: Review...push on sub document
    addSkill: function(userId, skillId, rating) {

        return new Promise(function(resolve, reject) {
            Skill.findById(skillId, function(skillErr, skill) {
                if(skillErr) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: skillErr
                    });
                } else if(!skill) {
                   reject({
                        message : "No skill document for " + skillId,
                        statusCode: 404
                    });
                } else {
                    User.findById(userId, function(err, user) {
                        if(err) {
                            reject({
                                message : "Database error",
                                statusCode: 500,
                                obj: err
                            });
                        } else if (!user) {
                            reject({
                                message : "No user document for " + userId,
                                statusCode: 404
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
                                    reject({
                                        message : "Database error",
                                        statusCode: 500,
                                        obj: err
                                    });
                                } else {
                                    resolve({
                                        message : "Skill " + skill.name + " added successfully",
                                        statusCode: 201,
                                        obj: user
                                    });
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
                            reject({
                                message: "Database error",
                                statusCode: 500,
                                obj: err
                            });
                        } else if(obj.nModified == 0) {
                            reject({
                                message: "No matching documents",
                                statusCode: 404
                            });
                        } else {
                            resolve({
                                message: "Skill removed successfully",
                                statusCode: 200,
                                obj: obj
                            });
                        }
                    }
                );
        })
    }

};
