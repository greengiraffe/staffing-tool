var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    project: {type: String, required: true},
    description: {type: String},
    start: {type: Date},
    end: {type: Date},
    budget: {type: Number}
});

module.exports = mongoose.model('Project', schema);