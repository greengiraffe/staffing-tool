let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');

let schema = new Schema({
    name: {type: String, index: {unique: true}}
});

schema.plugin(uniqueValidator);
module.exports = mongoose.model('Skill', schema);
