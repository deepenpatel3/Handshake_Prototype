const Jobs = require('../Models/jobModel');
const Events = require("../Models/eventModel");

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend company_jobs_events service');
    console.log("student_jobs_events msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "student_get_jobs":
            student_get_jobs(msg, callback);
            break;
        case "student_get_applied_jobs":
            student_get_applied_jobs(msg, callback);
            break;
        case "student_get_events":
            student_get_events(msg, callback);
            break;
        case "student_get_registered_events":
            student_get_registered_events(msg, callback);
            break;
        case "student_register_event":
            student_register_event(msg, callback);
            break;
    }
}

function student_get_jobs(msg, callback) {
    let limit = 4;
    let pageNO = msg.body.pageNO;

    let condition = {};
    if (msg.body.filter === undefined) {
        condition = { $and: [{ $or: [{ title: { $regex: '.*' + msg.body.titleOrCompany + '.*' } }, { companyName: { $regex: '.*' + msg.body.titleOrCompany + '.*' } }] }, { location: { $regex: '.*' + msg.body.location + '.*' } }] };
    }
    else {
        condition = { $and: [{ $or: [{ title: { $regex: '.*' + msg.body.titleOrCompany + '.*' } }, { companyName: { $regex: '.*' + msg.body.titleOrCompany + '.*' } }] }, { location: { $regex: '.*' + msg.body.location + '.*' } }, { category: { $in: msg.body.filter } }] };
    }


    Jobs.find(condition).limit(limit).skip((pageNO - 1) * limit).populate("companyID").sort(msg.body.sort).exec((err, jobs) => {
        if (err) {
            console.log("student_get_jobs error- ", err)
            callback(null, false);
        }
        else {

            callback(null, jobs);
        }
    })
}

function student_get_applied_jobs(msg, callback) {
    let limit = 4;
    let pageNO = msg.body.pageNO;

    let condition = {};
    if (msg.body.filter === undefined) {
        condition = {
            "appliedStudents._id": msg.body.SID
        };
    }
    else {
        condition = {
            "appliedStudents._id": msg.body.SID,
            "appliedStudents.status": { $in: msg.body.filter }
        };
    }


    Jobs.find(condition).limit(limit).skip((pageNO - 1) * limit).exec((err, result) => {
        if (err) {
            console.log("error", err)
        }
        else {
            // console.log("applied jobs", result)
            callback(null, result);
        }
    })
}

function student_get_events(msg, callback) {
    let limit = 4;
    let pageNO = msg.body.pageNO;

    Events.find({ name: { $regex: '.*' + msg.body.name + '.*' } }).limit(limit).skip((pageNO - 1) * limit).populate("registeredEvents._id", "companyID").sort("date").exec((err, events) => {
        if (err) {
            console.log("student_get_events error- ", err)
            callback(null, false);
        }
        else {

            callback(null, events);
        }
    })
}

function student_get_registered_events(msg, callback) {

    Events.find({ "registeredStudents._id": msg.body.SID }, (err, result) => {
        if (err) {
            console.log("error", err)
        }
        else {
            // console.log("applied jobs", result)
            callback(null, result);
        }
    })
}

function student_register_event(msg, callback) {
    Events.findByIdAndUpdate({ _id: msg.body.ID }, { $push: { registeredStudents: { _id: msg.body.SID } } }, { new: true }, (err, result) => {
        if (err) {
            console.log("error", err)
            callback(null, false);
        } else {
            callback(null, true);
        }
    })
}
// function handle_request(req, callback) {
//     var res = {};
//     console.log("In handle request:" + req.path);
//     if (req.path === "getJobs") {
//         let limit = parseInt(req.body.limit)
//         let pageNo = parseInt(req.body.pageNo)
//         let sort = req.body.sort
//         console.log("======\nSort : " + JSON.stringify(sort))

//         let condition = {};
//         condition.title = { $regex: '.*' + req.body.title + '.*' }
//         condition.location = { $regex: '.*' + req.body.location + '.*' }
//         if (req.body.filter.length > 0)
//             condition.job_category = { $in: req.body.filter }

//         Jobs.find(condition).limit(limit).skip((pageNo - 1) * limit).populate("cid").sort(sort).exec((err, results) => {
//             // if (err) res.value =(err)
//             res.value = (results);
//             callback(null, res)
//         })

//     } else if (req.path === "checkapplied") {
//         Jobs.findOne({ _id: req.body.jid }, { applications: 1 },
//             {
//                 arrayFilters: [
//                     { "element._id": req.body.sid }
//                 ]
//             }, (err, results) => {
//                 if (err) res.value = (err)
//                 else {
//                     if (results)
//                         res.value = (true)
//                     else
//                         res.value = (false)
//                 }
//                 callback(null, res);
//             })
//     } else if (req.path === "applyJobs") {
//         Jobs.findOneAndUpdate({ _id: req.body.jid }, { "$push": { "applications": { sid: req.body.sid, status: "PENDING", resume_url: req.imagepath } } }, { new: true }, (err, results) => {
//             if (err) res.value = (err)
//             else
//                 res.value = ("Applied");
//             callback(null, res)
//         })
//     } else if (req.path === "getApplication") {
//         let limit = parseInt(req.body.limit)
//         let pageNo = parseInt(req.body.pageNo)
//         let condition = null;
//         if (req.body.filter !== '') {
//             condition = {
//                 "applications.sid": req.body.sid,
//                 "applications.status": req.body.filter
//             };
//         } else if (req.body.filter === '') {
//             condition = {
//                 "applications.sid": req.body.sid
//             };
//         }
//         Jobs.find(condition).limit(limit).skip((pageNo - 1) * limit).populate("cid").exec((err, results) => {
//             if (err)
//                 res.value = (err)
//             else
//                 res.value = (results);
//             callback(null, res);
//         })
//     }

// }
// exports.handle_request = handle_request;