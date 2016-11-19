let Skill       = require('../../models/skill');

module.exports = {

    createSkill: function(name) {
       let skill = new Skill({name: name});
        return new Promise(function(reject, resolve) {
          skill.save(function(result, err) {
            if(err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    },

    removeSkill: function(id) {
        Skill.remove({_id: id}, function(err) {
            if (err) {return -1}
            return true;
        })
    },

    listSkills: function() {
        Skill.find({}, function(err, result) {
            return new Promise(function(reject, resolve) {
                if(err) { reject(err) }
                else { resolve(result) }
            })
        })
    },

    getSkillByID: function(id) {
        Skill.findById(id, function(err, result){
            if (err) {return -1}
            return result;
        })
    },

    getSkillByName: function(name) {
        Skill.findOne({name: name}, function(err, result) {
            if (err) {return -1}
            return result;
        })
    }
};
