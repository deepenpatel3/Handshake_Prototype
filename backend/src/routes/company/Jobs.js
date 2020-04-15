const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkCompanyAuth } = require("../../Utils/passport");
const jwt = require('jsonwebtoken')
var { frontendURL } = require('../../Utils/config');
auth();

router.post('/postJob', checkCompanyAuth, function (req, res) {
    console.log('inside postJob api');

    kafka.make_request('company_jobs_events', { "path": "post_job", "body": req.body }, function (err, result) {
        console.log("got back from post_job kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            // console.log("result", result);
            // var payload = {
            //     email: result.email,
            //     phone: result.phone
            // }
            // var token = jwt.sign(payload, secret, {
            //     expiresIn: 1008000 // in seconds
            // });
            // res.end(JSON.stringify({ token: "JWT " + token }))
            res.end();
        }
    });
})

router.get('/getJobs', checkCompanyAuth, function (req, res) {
    console.log('inside get jobs api');
    console.log('req', req.query)

    kafka.make_request('company_jobs_events', { "path": "get_jobs", "body": req.query }, function (err, result) {
        console.log("got back from get_jobs kafka");
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

router.post('/changeStatus', checkCompanyAuth, function (req, res) {
    console.log('inside changeStatus api');

    kafka.make_request('company_jobs_events', { "path": "change_app_status", "body": req.body }, function (err, result) {
        console.log("got back from change_app_status kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("done")
            res.end();
        }
    });
})
module.exports = router;