const Company = require('../Models/companyModel');
const Jobs = require('../Models/jobModel');
const Events = require('../Models/eventModel');

exports.serve = function serve(msg, callback) {
    // console.log('inside kafka backend company_jobs_events service');
    console.log("msg", msg);
    // console.log("In Service path:", msg.path);
    switch (msg.path) {
        case "get_jobs":
            get_jobs(msg, callback);
            break;
        case "post_job":
            post_job(msg, callback);
            break;
        case "change_app_status":
            change_app_status(msg, callback);
            break;
        case "company_get_events":
            company_get_events(msg, callback);
            break;
        case "company_post_event":
            company_post_event(msg, callback);
            break;
    }
}

function get_jobs(msg, callback) {
    let pageNO = msg.body.pageNO;
    console.log("pageNO- ", pageNO)
    Jobs.find({ companyID: msg.body.CID }).limit(4).skip((pageNO - 1) * 4).populate("appliedStudents._id").exec((err, jobs) => {
        if (err) {
            console.log("err", err);
            callback(null, false);
        }
        else
            callback(null, jobs);
    })
}

function post_job(msg, callback) {
    var newJob = new Jobs({
        companyID: msg.body.CID,
        companyName: msg.body.companyName,
        title: msg.body.title,
        postingDate: msg.body.postingDate,
        deadline: msg.body.deadline,
        location: msg.body.location,
        salary: msg.body.salary,
        description: msg.body.description,
        category: msg.body.category
    });
    newJob.save();
    callback(null, true);
}

function change_app_status(msg, callback) {
    Jobs.findOneAndUpdate({ _id: msg.body._id },
        {
            "$set": { "appliedStudents.$[element].status": msg.body.status }
        },
        {
            arrayFilters: [
                { "element._id": msg.body.SID }
            ],
            new: true
        }, (err, result) => {
            if (err) {
                console.log("change app status error-", err)
                callback(null, false);
            }
            else {
                console.log("result", result)
                callback(null, true);
            }
        })
}

function company_get_events(msg, callback) {
    let pageNO = msg.body.pageNO;
    // console.log("pageNO- ", pageNO)
    Events.find({ companyID: msg.body.CID }).limit(4).skip((pageNO - 1) * 4).populate("registeredStudents._id").exec((err, events) => {
        if (err) {
            console.log("err", err);
            callback(null, false);
        }
        else
            callback(null, events);
    })
}

function company_post_event(msg, callback) {
    var newEvent = new Events({
        companyID: msg.body.CID,
        companyName: msg.body.companyName,
        name: msg.body.name,
        date: msg.body.date,
        location: msg.body.location,
        description: msg.body.description,
        time: msg.body.time,
        eligibility: msg.body.eligibility
    });
    newEvent.save();
    callback(null, true);
}