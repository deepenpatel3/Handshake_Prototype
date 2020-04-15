const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkCompanyAuth } = require("../../Utils/passport");
const jwt = require('jsonwebtoken')
auth();

router.get('/getBasicDetails', checkCompanyAuth, function (req, res) {
    console.log('inside company get basic details api');
    console.log('req', req.query)

    kafka.make_request('company_profile', { "path": "company_get_basic_details", "body": req.query }, function (err, result) {
        console.log("got back from get_basic_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                companyName: result.companyName,
                email: result.email,
                location: result.location,
                phone: result.phone,
                description: result.description,
                profilePic: result.profilePic
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateContactDetails', checkCompanyAuth, function (req, res) {
    console.log('inside updateContactDetails api');

    kafka.make_request('company_profile', { "path": "update_contact_details", "body": req.body }, function (err, result) {
        console.log("got back from update_contact_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                email: result.email,
                phone: result.phone
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateBasicDetails', checkCompanyAuth, function (req, res) {
    console.log('inside updateBasicDetails api');

    kafka.make_request('company_profile', { "path": "company_update_basic_details", "body": req.body }, function (err, result) {
        console.log("got back from company_update_basic_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                companyName: result.companyName,
                location: result.location,
                description: result.description
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})
module.exports = router;