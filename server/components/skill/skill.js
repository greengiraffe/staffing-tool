let Skill = require('../../models/skill');

module.exports = {

    createSkill: function(name) {
        let skill = new Skill({name:name});
        return new Promise(function(resolve, reject) {
            skill.save(function(err, result) {
                if(err) {
                  reject(err);
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
                    reject({statusCode: 500, obj: err});
                } else if(!skill) {
                    reject({statusCode: 400});
                } else {
                    skill.remove(function(err, result) {
                        if(err) {
                            reject({statusCode: 500, obj: err});
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        });
    },

    listSkills: function() {
        return Skill.find().exec();
    },

    getSkillByID: function(id) {
        return new Promise(function(resolve, reject) {
            Skill.findById(id, function(err, skill) {
                if(err) {
                    reject({statusCode: 500, obj: err});
                } else if(!skill) {
                    reject({statusCode: 400});
                } else {
                    resolve(skill);
                }
            })
        });
    },

    updateSkill: function(id, new_name) {
        return new Promise(function(resolve, reject) {
            Skill.findById(id, function(err, skill) {
                if(err) {
                    reject({statusCode: 500, obj: err});
                } else if(!skill) {
                    reject({statusCode: 400});
                } else {
                    skill.name = new_name;
                    skill.__v++;
                    skill.save(function(err, result) {
                        if(err) {
                            reject({statusCode: 500, obj: err});
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        })
    }

};
