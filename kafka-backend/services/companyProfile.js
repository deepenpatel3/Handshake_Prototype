const Company = require('../Models/companyModel');

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend company_profile service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "company_get_basic_details":
            company_get_basic_details(msg, callback);
            break;
        case "update_contact_details":
            update_contact_details(msg, callback);
            break;
        case "company_update_basic_details":
            company_update_basic_details(msg, callback);
            break;
    }
}

function company_get_basic_details(msg, callback) {
    Company.findById(msg.body.CID, (err, company) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            console.log("company basic details found- ", company);
            callback(null, { companyName: company.companyName, email: company.email, location: company.location, phone: company.phone, description: company.description, profilePic: company.profilePic })
        }
    })
}

function update_contact_details(msg, callback) {
    Company.findByIdAndUpdate({ _id: msg.body.CID }, {
        email: msg.body.email,
        phone: msg.body.phone
    }, { new: true }, (err, company) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            console.log('updated successfully');
            console.log("company", company)
            callback(null, { email: company.email, phone: company.phone });
        }
    })
}

function company_update_basic_details(msg, callback) {
    Company.findByIdAndUpdate({ _id: msg.body.CID }, {
        companyName: msg.body.companyName,
        location: msg.body.location,
        description: msg.body.description
    }, { new: true }, (err, company) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            console.log('updated successfully');
            console.log("company", company)
            callback(null, { companyName: company.companyName, location: company.location, description: company.description });
        }
    })
}