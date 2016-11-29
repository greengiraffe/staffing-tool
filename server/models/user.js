let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');

let userSkill = new Schema({
    _id: false,
    skill: {type: Schema.Types.ObjectId, ref: 'Skill', required: true},
    rating: {type: Number}
});

let schema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    skype: {type: String},
    phone: {type: String},
    location: {type: String, default: 'Berlin HQ'},
    role: {type: String, required: true, default: 'user'}, // admin, user, user_creator
    userSkills: [userSkill],
    picture: {type: String}, // url to image
    register: {type: Boolean, default: true}
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
