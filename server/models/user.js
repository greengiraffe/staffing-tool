var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {type: String, required: true},
    email: {type: String},
    password: {type: String, required: true}, // hashed
    picture: {type: String} // url to image
});

module.exports = mongoose.model('User', schema);