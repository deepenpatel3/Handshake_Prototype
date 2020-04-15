"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
const kafka = require("../../../kafka/client");
const { secret } = require('../../Utils/config');


router.post("/signIn", function (req, res) {
    console.log('inside company sign IN');
    kafka.make_request('login', { "path": "company_login", "body": req.body }, function (err, result) {
        console.log('in company login result');
        if (err) {
            console.log('error', err)
            res.send({
                signinSuccess: false
            })
        } else {
            console.log("result", result);
            if (result.signInSuccess) {
                var payload = {
                    signInSuccess: result.signInSuccess,
                    CID: result.CID,
                    companyName: result.companyName
                }
            }
            else {
                var payload = { signInSuccess: result.signInSuccess }
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
});

router.post("/signUp", function (req, res) {
    console.log('inside company sign up');

    kafka.make_request('login', { "path": "company_signup", "body": req.body }, function (err, result) {
        console.log('in company signup result');
        if (err) {
            console.log('error', err)
            res.send({
                signUpSuccess: false
            })
        } else {
            // console.log("result", result);
            res.end(JSON.stringify({ signUpSuccess: result.signUpSuccess }))
        }
    });
})
module.exports = router;