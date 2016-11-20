let Skill = require('../../models/skill');

module.exports = {

    createSkill: function(name) {
        let skill = new Skill({name: name});
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
        return new Promise (function(resolve, reject) {
            Skill.remove({_id : id}, function(err, result) {
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

    listSkills: function() {
        return Skill.find().exec();
    },

    getSkillByID: function(id) {
        return Skill.findById(id).exec();
    },

    getSkillByName: function(name) {
        return Skill.findOne({name: name}).exec();
    },

    updateSkill: function(id, new_name) {

        return new Promise(function(resolve, reject) {
            Skill.findById(id, function(err, skill) {
                if(err) {
                    reject(err);
                } else if(!skill) {
                    reject(skill);
                } else {    
                    skill.name = new_name;
                    skill.__v++;
                    skill.save(function(err, result) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });        
                }
                
            });            
        })
    }
};
