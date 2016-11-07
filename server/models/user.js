var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Skill = require('skill');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true},
    skype: {type: String},
    phone: {type: String},
    location: {type: String, default: 'Berlin HQ'},
    role: {type: String, required: true}, // admin, user, user_creator
    skill: [{name: Skill, rating: Number}],
    picture: {type: String} // url to image
});

// Plugin to salt and hash user documents
schema.plugin(passportLocalMongoose());

module.exports = mongoose.model('User', schema);
