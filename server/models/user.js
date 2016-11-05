var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var schema = new Schema({
    username: {type: String, required: true},
    firstname: {type: String},
    lastname: {type: String},
    email: {type: String},
    password: {type: String, required: true},
    role: {type: String},
    picture: {type: String} // url to image
});

// Plugin to salt and hash user documents
schema.plugin(passportLocalMongoose());

module.exports = mongoose.model('User', schema);