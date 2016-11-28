let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    start: {type: Date},
    end: {type: Date},
    budget: {type: Number}
});

module.exports = mongoose.model('Project', schema);
