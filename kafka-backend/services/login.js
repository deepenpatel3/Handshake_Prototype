const Students = require('../Models/studentModel');
const Company = require("../Models/companyModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend login service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "student_login":
            student_login(msg, callback);
            break;
        case "student_signup":
            student_signup(msg, callback);
            break;
        case "company_signup":
            company_signup(msg, callback);
            break;
        case "company_login":
            company_login(msg, callback);
            break;
    }
}

function student_login(msg, callback) {
    // console.log('student email- ', msg.body.email);
    // console.log('student password- ', msg.body.password);

    let password = msg.body.password;
    Students.findOne({ email: msg.body.email })
        .then(student => {
            if (student) {
                console.log("student found-", student)
                if (bcrypt.compareSync(password, student.password)) {
                    console.log('student match')
                    callback(null, { signInSuccess: true, SID: student._id, name: student.name })
                }
                else {
                    console.log('wrong password')
                    callback(null, { signInSuccess: false, message: "wrong password" })
                }
            }
            else {
                console.log('wrong email')
                callback(null, { signInSuccess: false, message: "wrong email" })
            }
        })
        .catch(error => {
            console.log('student login error', error)
        })
}

function company_login(msg, callback) {

    let password = msg.body.password;
    Company.findOne({ email: msg.body.email })
        .then(company => {
            if (company) {
                console.log("company found-", company)
                if (bcrypt.compareSync(password, company.password)) {
                    console.log('company match')
                    callback(null, { signInSuccess: true, CID: company._id, companyName: company.companyName })
                }
                else {
                    console.log('wrong password')
                    callback(null, { signInSuccess: false, message: "wrong password" })
                }
            }
            else {
                console.log('wrong email')
                callback(null, { signInSuccess: false, message: "wrong email" })
            }
        })
        .catch(error => {
            console.log('company login error', error)
        })
}

function student_signup(msg, callback) {

    let hash = bcrypt.hashSync(msg.body.password, salt);
    var newStudent = new Students({
        name: msg.body.name,
        password: hash,
        email: msg.body.email,
        city: msg.body.city,
        school: msg.body.school
    });
    newStudent.save();
    callback(null, { signUpSuccess: true });
}

function company_signup(msg, callback) {

    let hash = bcrypt.hashSync(msg.body.password, salt);
    var newCompany = new Company({
        companyName: msg.body.companyName,
        password: hash,
        email: msg.body.email,
        location: msg.body.location
    });
    newCompany.save();
    callback(null, { signUpSuccess: true });
}