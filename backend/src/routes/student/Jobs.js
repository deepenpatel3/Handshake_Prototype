const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkStudentAuth } = require("../../Utils/passport");
const jwt = require('jsonwebtoken');
const Company = require('../../Models/companyModel');
auth();

router.get('/getJobs', checkStudentAuth, function (req, res) {
    console.log('inside students get jobs api');
    console.log('req', req.query)

    kafka.make_request('student_jobs_events', { "path": "student_get_jobs", "body": req.query }, function (err, result) {
        console.log("got back from student_get_jobs kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                jobs: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getAppliedJobs', checkStudentAuth, function (req, res) {
    console.log('inside students get applied jobs api');
    console.log('req', req.query)

    kafka.make_request('student_jobs_events', { "path": "student_get_applied_jobs", "body": req.query }, function (err, result) {
        console.log("got back from student_get_applied_jobs kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                jobs: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getCompanyDetails', function (req, res) {
    console.log('inside students get company details api');
    console.log('req', req.query)

    Company.findById(req.query.CID, (err, company) => {
        if (err) {
            console.log("error", err)
            res.end();
        }
        else {
            // console.log("company basic details found- ", company);
            res.end(JSON.stringify({ companyName: company.companyName, email: company.email, location: company.location, phone: company.phone, description: company.description }))
        }
    })
})
module.exports = router;