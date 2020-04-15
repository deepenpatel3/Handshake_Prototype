const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkStudentAuth } = require("../../Utils/passport");
const { frontendURL } = require("../../Utils/config");
const jwt = require('jsonwebtoken');
auth();

router.get('/getEvents', checkStudentAuth, function (req, res) {
    console.log('inside students get events api');
    console.log('req', req.query)

    kafka.make_request('student_jobs_events', { "path": "student_get_events", "body": req.query }, function (err, result) {
        console.log("got back from student_get_events kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                events: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getRegisteredEvents', checkStudentAuth, function (req, res) {
    console.log('inside students get registered events api');
    console.log('req', req.query)

    kafka.make_request('student_jobs_events', { "path": "student_get_registered_events", "body": req.query }, function (err, result) {
        console.log("got back from student_get_registered_events kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                events: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/registerEvent', checkStudentAuth, function (req, res) {
    console.log('inside students register event api');
    // console.log('req', req.body)

    kafka.make_request('student_jobs_events', { "path": "student_register_event", "body": req.body }, function (err, result) {
        console.log("got back from student_register_event kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            res.end()
            // res.redirect(frontendURL + "/events");
            // var payload = {
            //     events: result
            // }
            // var token = jwt.sign(payload, secret, {
            //     expiresIn: 1008000 // in seconds
            // });
            // res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})
module.exports = router;
