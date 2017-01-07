let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let projectTask = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    requiredSkills: [{type: Schema.Types.ObjectId, ref: 'Skill'}],
    assignedUsers: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

let projectSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true},
    description: {type: String},
    type: {type: String, required: true},
    client: {type: String},
    budget: {type: Number, required: true},
    expBudget: {type: Number},
    isPriority: {type: Boolean},
    projectTasks: [projectTask],
    start: {type: Date, required: true},
    end: {type: Date, required: true},
});

module.exports = mongoose.model('Project', projectSchema);
