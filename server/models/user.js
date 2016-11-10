let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Skill = require('./skill');

let schema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    skype: {type: String},
    phone: {type: String},
    location: {type: String, default: 'Berlin HQ'},
    role: {type: String, required: true}, // admin, user, user_creator
    skill: [{name: Skill, rating: Number}],
    picture: {type: String} // url to image
});

module.exports = mongoose.model('User', schema);
