const mongoose = require('mongoose');
const Company = require('./companyModel');
const Students = require('./studentModel');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var eventSchema = new Schema({
    name: String,
    date: Date,
    location: String,
    time: String,
    description: String,
    eligibility: { type: String, default: "all" },
    companyID: { type: mongoose.Schema.Types.ObjectId, ref: Company },
    companyName: String,
    registeredStudents: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: Students }
    }],
},
    {
        versionKey: false
    });

module.exports = mongoose.model('event', eventSchema);
