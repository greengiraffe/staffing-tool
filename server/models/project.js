let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    type: {type: String, required: true},
    client: {type: String},
    budget: {type: Number, required: true},
    expbudget: {type: Number},
    priority: {type: Boolean},
    //projectTasks: [projectTask],
    start: {type: Date, required: true},
    end: {type: Date, required: true}
});

module.exports = mongoose.model('Project', schema);
