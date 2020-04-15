const mongoose = require('mongoose');
// require('mongoose-type-url');
const Schema = mongoose.Schema;

var companySchema = new Schema({
    companyName: String,
    email: String,
    password: String,
    location: String,
    profilePic: String,
    phone: String,
    description: String
},
    {
        versionKey: false
    });

module.exports = mongoose.model('company', companySchema);
