let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let uniqueValidator = require('mongoose-unique-validator');


let schema = new Schema({
    token: {type: String, default: true},
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('BlacklistedToken', schema);
