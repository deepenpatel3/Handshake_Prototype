const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkStudentAuth } = require("../../Utils/passport");
const { frontendURL } = require("../../Utils/config");
const jwt = require('jsonwebtoken');
auth();

router.get('/getStudents', function (req, res) {
    console.log('inside students get students api');
    console.log('req', req.query)

    kafka.make_request('students', { "path": "student_get_students", "body": req.query }, function (err, result) {
        console.log("got back from student_get_students kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            // console.log("result", result);
            var payload = {
                students: result
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})
module.exports = router;