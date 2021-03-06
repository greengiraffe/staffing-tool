let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');
let User = require('./user');

let schema = new Schema({
    name: {type: String, index: {unique: true}}
});

schema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    // this.model('userSkills').remove(, next);
    // var id = this._id
    let test = this.model('User').find({'userSkills.skill' : this._id}).exec().bind(this);
    // .populate({
    //     path: 'userSkills'
    //  });


    test.then(function(result) {
        if(result.length === 0 ) {
            next();
        } else {
            for(let i = 0; i < result.length; i++) {
                User.update(
                    { '_id' : result[i]._id },
                    {   $pull : { "userSkills" : { skill: this._id }}},
                    { safe : true },
                    function callback(err, obj) {
                        if(err) {
                          console.log(err);
                          return -1;
                        }
                        else {
                            console.log(obj);
                            next();
                        }
                    }
                );
            }
        }


    })
    .catch(function (argument) {
        console.log(argument);
    });

    console.log('removed pre');
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('Skill', schema);
