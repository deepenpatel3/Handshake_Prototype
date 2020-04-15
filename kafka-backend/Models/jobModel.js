const mongoose = require('mongoose');
const Company = require('./companyModel');
const Students = require('./studentModel');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var jobSchema = new Schema({
    title: String,
    postingDate: Date,
    deadline: Date,
    location: String,
    salary: Number,
    description: String,
    category: String,
    companyID: { type: mongoose.Schema.Types.ObjectId, ref: Company },
    companyName: String,
    appliedStudents: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: Students },
        status: String,
        resume: String,
        applicationDate: { type: Date, default: new Date() }
    }],
},
    {
        versionKey: false
    });

module.exports = mongoose.model('job', jobSchema);
