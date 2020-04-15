const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkCompanyAuth } = require("../../Utils/passport");
const jwt = require('jsonwebtoken')
var { frontendURL } = require('../../Utils/config');
auth();

router.post('/postEvent', checkCompanyAuth, function (req, res) {
    console.log('inside postEvent api');

    kafka.make_request('company_jobs_events', { "path": "company_post_event", "body": req.body }, function (err, result) {
        console.log("got back from post_event kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            res.redirect(frontendURL + "/companyEvents");
            // res.end();
        }
    });
})

router.get('/getEvents', checkCompanyAuth, function (req, res) {
    console.log('inside get events api');
    // console.log('req', req.query)

    kafka.make_request('company_jobs_events', { "path": "company_get_events", "body": req.query }, function (err, result) {
        console.log("got back from get_events kafka");
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

module.exports = router;