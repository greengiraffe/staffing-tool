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
    phone: {type: String},
    location: {type: String, default: 'Berlin HQ'},
    role: {type: String, enum: ['admin', 'user', 'user_creator', 'freelancer'], required: true, default: 'user'},
    userSkills: [userSkill],
    register: {type: Boolean, default: true}
});

/**
 * Override the mongoose toJSON method to exclude password and version fields
 */
schema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
