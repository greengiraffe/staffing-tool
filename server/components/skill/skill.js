let Skill = require('../../models/skill');

module.exports = {

    createSkill: function(name) {
        let skill = new Skill({name: name});
        return new Promise(function(resolve, reject) {
            skill.save(function(err, result) {
                if(err) {
                  reject({
                    message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else {
                    resolve(result);
                }
            });
        });
    },

    removeSkill: function(id) {
        return new Promise(function(resolve, reject) {
            Skill.findById(id, function(err, skill) {
                if(err) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(!skill) {
                    reject({
                        message : "No skill document for " + id,
                        statusCode: 404
                    });
                } else {    
                    skill.remove(function(err, result) {
                        if(err) {
                            reject({
                                message : "Database error",
                                statusCode: 500,
                                obj: err
                            });
                        } else {
                            resolve({
                                message : "Skill deleted successfully",
                                statusCode: 200,
                                obj: result
                            });
                        }
                    });        
                }
                
            });            
        });
        /*return new Promise (function(resolve, reject) {
            Skill.remove({_id : id}, function(err, result) {
                if(err) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else {
                    if(result.result.n == 0) {
                        reject({
                            message : "No skill document for " + id,
                            statusCode: 404,
                        });
                    } else {
                        resolve({
                            message : "Skill deleted successfully",
                            statusCode: 200,
                        });
                    }
                }
            });
        });*/

    },

    listSkills: function() {
        return Skill.find().exec();
    },

    getSkillByID: function(id) {
        return new Promise(function(resolve, reject) {
            Skill.findById(id, function(err, skill) {
                if(err) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(!skill) {
                    reject({
                        message : "No skill document for " + id,
                        statusCode: 404
                    });
                } else {
                    resolve(skill);
                }
            })
        });
    },

    getSkillByName: function(name) {
        return Skill.findOne({name: name}).exec();
    },

    updateSkill: function(id, new_name) {

        return new Promise(function(resolve, reject) {
            Skill.findById(id, function(err, skill) {
                if(err) {
                    reject({
                        message : "Database error",
                        statusCode: 500,
                        obj: err
                    });
                } else if(!skill) {
                    reject({
                        message : "No skill document for " + id,
                        statusCode: 404
                    });
                } else {    
                    skill.name = new_name;
                    skill.__v++;
                    skill.save(function(err, result) {
                        if(err) {
                            reject({
                                message : "Database error",
                                statusCode: 500,
                                obj: err
                            });
                        } else {
                            resolve({
                                message : "Skill updated successfully",
                                statusCode: 200,
                                obj: result
                            });
                        }
                    });        
                }
                
            });            
        })
    }
};
