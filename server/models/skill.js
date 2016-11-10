let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    name: {type: String}
});

// module.exports = mongoose.model('Skill', schema);
module.exports = schema;
