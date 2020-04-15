const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
// const { checkStudentAuth } = require("../../Utils/passport");
// const { frontendURL } = require("../../Utils/config");
const jwt = require('jsonwebtoken');
auth();

router.get('/getMessages', function (req, res) {
    console.log('inside students get messages api');
    // console.log('req', req.query)

    kafka.make_request('students', { "path": "student_get_messages", "body": req.query }, function (err, result) {
        console.log("got back from student_get_messages kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                messages: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/sendMessage', function (req, res) {
    console.log('inside students send message api');
    // console.log('req', req.query)

    kafka.make_request('students', { "path": "student_post_message", "body": req.body }, function (err, result) {
        console.log("got back from student_post_message kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {

            console.log("result", result);
            var payload = {
                success: result.success
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getChats', function (req, res) {
    console.log('inside students get chats api');
    // console.log('req', req.query)

    kafka.make_request('students', { "path": "student_get_chats", "body": req.query }, function (err, result) {
        console.log("got back from student_get_chats kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            // console.log("result", result);
            var payload = {
                chats: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

module.exports = router;