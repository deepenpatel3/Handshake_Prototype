const Students = require('../Models/studentModel');

exports.serve = function serve(msg, callback) {
    console.log('inside kafka backend student_profile service');
    console.log("msg", msg);
    console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "get_basic_details":
            get_basic_details(msg, callback);
            break;
        case "update_basic_details":
            // console.log(("inside update basic details"))
            update_basic_details(msg, callback);
            break;
        case "get_contact_info":
            get_contact_info(msg, callback);
            break;
        case "update_contact_info":
            update_contact_info(msg, callback);
            break;
        case "get_career_objective":
            get_career_objective(msg, callback);
            break;
        case "update_career_objective":
            update_career_objective(msg, callback);
            break;
        case "get_skills":
            get_skills(msg, callback);
            break;
        case "add_skill":
            add_skill(msg, callback);
            break;
        case "update_skill":
            update_skill(msg, callback);
            break;
        case "delete_skill":
            delete_skill(msg, callback);
            break;
        case "get_education_details":
            get_education_details(msg, callback);
            break;
        case "add_education_details":
            add_education_details(msg, callback);
            break;
        case "update_education_details":
            update_education_details(msg, callback);
            break;
        case "delete_education_details":
            delete_education_details(msg, callback);
            break;
        case "get_experience":
            get_experience(msg, callback);
            break;
        case "add_experience":
            add_experience(msg, callback);
            break;
        case "update_experience":
            update_experience(msg, callback);
            break;
        case "delete_experience":
            delete_experience(msg, callback);
            break;
    }
}

function get_basic_details(msg, callback) {
    // console.log('student Id- ', msg.body);
    Students.findOne({ _id: msg.body.SID }, (err, student) => {
        if (err) {
            console.log('get basic details kafka error- ', err)
            callback(null, { success: false })
        }
        else {
            callback(null, { success: true, name: student.name, school: student.school, city: student.city });
        }
    })
}

function update_basic_details(msg, callback) {
    console.log("student id- ", msg.body);

    Students.findByIdAndUpdate({ _id: msg.body.SID }, {
        name: msg.body.name,
        school: msg.body.school,
        city: msg.body.city
    }, { new: true }, (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            console.log('updated successfully');
            console.log("student", student)
            callback(null, { name: student.name, city: student.city, school: student.school });
        }
    })
}

function get_contact_info(msg, callback) {
    Students.findOne({ _id: msg.body.SID }, (err, student) => {
        if (err) {
            console.log('get basic details kafka error- ', err)
            callback(null, { success: false })
        }
        else {
            callback(null, { success: true, phone: student.phone, email: student.email });
        }
    })
}

function update_contact_info(msg, callback) {
    Students.findByIdAndUpdate({ _id: msg.body.SID }, {
        email: msg.body.email,
        phone: msg.body.phone
    }, { new: true }, (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            // console.log('updated successfully');
            // console.log("student", student)
            callback(null, { email: student.email, phone: student.phone });
        }
    })
}

function get_career_objective(msg, callback) {
    Students.findOne({ _id: msg.body.SID }, (err, student) => {
        if (err) {
            console.log('get basic details kafka error- ', err)
            callback(null, { success: false })
        }
        else {
            callback(null, { careerObjective: student.careerObjective });
        }
    })
}

function update_career_objective(msg, callback) {
    Students.findByIdAndUpdate({ _id: msg.body.SID }, { careerObjective: msg.body.careerObjective }, { new: true }, (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            // console.log('updated successfully');
            // console.log("student", student)
            callback(null, { careerObjective: student.careerObjective });
        }
    })
}

function get_skills(msg, callback) {
    Students.findOne({ _id: msg.body.SID }, (err, student) => {
        if (err) {
            console.log('get skills kafka error- ', err)
            callback(null, { success: false })
        }
        else {
            callback(null, { skills: student.skills });
        }
    })
}

function add_skill(msg, callback) {
    Students.findById({ _id: msg.body.SID }, async (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            await student.skills.push(msg.body.skill);
            await student.save();
            // console.log("student", student)
            callback(null, { skills: student.skills });
        }
    })
}

function update_skill(msg, callback) {
    Students.findById({ _id: msg.body.SID }, async (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            student.skills = await student.skills.map(skill => skill === msg.body.skill ? msg.body.updatedSkill : skill);
            await student.save();
            console.log("student", student)
            callback(null, { skills: student.skills });
        }
    })
}

function delete_skill(msg, callback) {
    Students.findById({ _id: msg.body.SID }, async (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            await student.skills.splice(student.skills.indexOf(msg.body.skill), 1);
            await student.save();
            console.log("student", student)
            callback(null, { skills: student.skills });
        }
    })
}

function get_education_details(msg, callback) {
    Students.findOne({ _id: msg.body.SID }, (err, student) => {
        if (err) {
            console.log('get skills kafka error- ', err)
            callback(null, { success: false })
        }
        else {
            callback(null, { educationDetails: student.educationDetails });
        }
    })
}

function add_education_details(msg, callback) {
    let body = {
        school: msg.body.school,
        location: msg.body.location,
        degree: msg.body.degree,
        major: msg.body.major,
        passingYear: msg.body.passingYear,
        gpa: msg.body.gpa
    }
    Students.findById({ _id: msg.body.SID }, async (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            await student.educationDetails.push(body);
            await student.save();
            // console.log("student- ", student)
            callback(null, { educationDetails: student.educationDetails });
        }
    })
}

function update_education_details(msg, callback) {
    Students.findOneAndUpdate({ _id: msg.body.SID },
        {
            "$set":
            {
                "educationDetails.$[element].school": msg.body.school,
                "educationDetails.$[element].location": msg.body.location,
                "educationDetails.$[element].degree": msg.body.degree,
                "educationDetails.$[element].passingYear": msg.body.passingYear,
                "educationDetails.$[element].major": msg.body.major,
                "educationDetails.$[element].gpa": msg.body.gpa
            }
        },
        {
            arrayFilters: [
                { "element._id": msg.body._id }
            ],
            new: true
        },
        (err, student) => {
            if (err) {
                console.log("error", err)
                callback(null, null);
            }
            else {
                // console.log("student- ", student)
                callback(null, { educationDetails: student.educationDetails });
            }
        })
}

function delete_education_details(msg, callback) {
    Students.findOneAndUpdate({ _id: msg.body.SID }, { "$pull": { "educationDetails": { "_id": msg.body._id } } }, { new: true }, (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            // console.log("student- ", student)
            callback(null, { educationDetails: student.educationDetails });
        }
    })
}

function get_experience(msg, callback) {
    Students.findOne({ _id: msg.body.SID }, (err, student) => {
        if (err) {
            console.log('get experience kafka error- ', err)
            callback(null, null)
        }
        else {
            console.log("inside GET EXPERIENCE KAFKA, STUDENT- ", student)
            callback(null, { experienceDetails: student.experienceDetails });
        }
    })
}

function add_experience(msg, callback) {
    let body = {
        companyName: msg.body.companyName,
        title: msg.body.title,
        location: msg.body.location,
        startDate: msg.body.startDate,
        endDate: msg.body.endDate,
        description: msg.body.description
    }
    Students.findById({ _id: msg.body.SID }, async (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            await student.experienceDetails.push(body);
            await student.save();
            // console.log("student- ", student)
            callback(null, { experienceDetails: student.experienceDetails });
        }
    })
}

function update_experience(msg, callback) {
    Students.findOneAndUpdate({ _id: msg.body.SID },
        {
            "$set":
            {
                "experienceDetails.$[element].companyName": msg.body.companyName,
                "experienceDetails.$[element].location": msg.body.location,
                "experienceDetails.$[element].title": msg.body.title,
                "experienceDetails.$[element].startDate": msg.body.startDate,
                "experienceDetails.$[element].endDate": msg.body.endDate,
                "experienceDetails.$[element].description": msg.body.description
            }
        },
        {
            arrayFilters: [
                { "element._id": msg.body._id }
            ],
            new: true
        },
        (err, student) => {
            if (err) {
                console.log("error", err)
                callback(null, null);
            }
            else {
                // console.log("student- ", student)
                callback(null, { experienceDetails: student.experienceDetails });
            }
        })
}

function delete_experience(msg, callback) {
    Students.findOneAndUpdate({ _id: msg.body.SID }, { "$pull": { "experienceDetails": { "_id": msg.body._id } } }, { new: true }, (err, student) => {
        if (err) {
            console.log("error", err)
            callback(null, null);
        }
        else {
            // console.log("student- ", student)
            callback(null, { experienceDetails: student.experienceDetails });
        }
    })
}