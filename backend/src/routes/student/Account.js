"use strict";
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('../../Utils/config');
const kafka = require("../../../kafka/client");
const { auth } = require("../../Utils/passport");
auth();

router.post("/signIn", (req, res) => {
    console.log('inside student sign IN');
    console.log('req body', req.body);
    let body = {
        email: req.body.email,
        password: req.body.password
    }
    kafka.make_request('login', { "path": "student_login", "body": body }, function (err, result) {
        console.log('in student login result');
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
                    SID: result.SID,
                    name: result.name
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
    console.log('inside student sign up');

    kafka.make_request('login', { "path": "student_signup", "body": req.body }, function (err, result) {
        console.log('in student signup result');
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