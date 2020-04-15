const express = require("express");
const router = express.Router();
const { auth } = require("../../Utils/passport");
const { secret } = require('../../Utils/config');
var kafka = require('../../../kafka/client');
const { checkStudentAuth } = require("../../Utils/passport");
const jwt = require('jsonwebtoken')
auth();


router.get('/getBasicDetails', checkStudentAuth, function (req, res) {
    console.log('inside student get basic details api');
    console.log('req', req.query)

    kafka.make_request('student_profile', { "path": "get_basic_details", "body": req.query }, function (err, result) {
        console.log("got back from get_basic_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                name: result.name,
                school: result.school,
                city: result.city
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateBasicDetails', checkStudentAuth, function (req, res) {
    console.log('inside update basic details');
    console.log('req.body', req.body)

    kafka.make_request('student_profile', { "path": "update_basic_details", "body": req.body }, function (err, result) {
        console.log("got back from update_basic_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                name: result.name,
                school: result.school,
                city: result.city
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getContactInfo', checkStudentAuth, function (req, res) {
    console.log('inside get contact info');

    kafka.make_request('student_profile', { "path": "get_contact_info", "body": req.query }, function (err, result) {
        console.log("got back from get_contact_info kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                phone: result.phone,
                email: result.email
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateContactInfo', checkStudentAuth, function (req, res) {
    console.log('inside update contact info');

    kafka.make_request('student_profile', { "path": "student_update_contact_info", "body": req.body }, function (err, result) {
        console.log("got back from student_update_contact_info kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                phone: result.phone,
                email: result.email
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });

})

router.get('/getCareerObjective', checkStudentAuth, function (req, res) {
    console.log('inside get career objective api');

    kafka.make_request('student_profile', { "path": "get_career_objective", "body": req.query }, function (err, result) {
        console.log("got back from get_career_objective kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                careerObjective: result.careerObjective
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateCareerObjective', checkStudentAuth, function (req, res) {
    console.log('inside update career objective api');

    kafka.make_request('student_profile', { "path": "update_career_objective", "body": req.body }, function (err, result) {
        console.log("got back from update_career_objective kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                careerObjective: result.careerObjective
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });

})

router.get('/getSkills', checkStudentAuth, function (req, res) {
    console.log('inside get skills api');

    kafka.make_request('student_profile', { "path": "get_skills", "body": req.query }, function (err, result) {
        console.log("got back from get_skills kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                skills: result.skills
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/addSkill', checkStudentAuth, function (req, res) {
    console.log('inside add skill api');

    kafka.make_request('student_profile', { "path": "add_skill", "body": req.body }, function (err, result) {
        console.log("got back from add_skill kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                skills: result.skills
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateSkill', checkStudentAuth, function (req, res) {
    console.log('inside update skill api');

    kafka.make_request('student_profile', { "path": "update_skill", "body": req.body }, function (err, result) {
        console.log("got back from update_skill kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                skills: result.skills
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/deleteSkill', checkStudentAuth, function (req, res) {
    console.log('inside delete skill api');

    kafka.make_request('student_profile', { "path": "delete_skill", "body": req.body }, function (err, result) {
        console.log("got back from delete_skill kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                skills: result.skills
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getEducationDetails', checkStudentAuth, function (req, res) {
    console.log('inside get education api');

    kafka.make_request('student_profile', { "path": "get_education_details", "body": req.query }, function (err, result) {
        console.log("got back from get_education_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                educationDetails: result.educationDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/addEducationDetails', checkStudentAuth, function (req, res) {
    console.log('inside add education api');

    kafka.make_request('student_profile', { "path": "add_education_details", "body": req.body }, function (err, result) {
        console.log("got back from add_education kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                educationDetails: result.educationDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateEducationDetails', checkStudentAuth, function (req, res) {
    console.log('inside update education api');

    kafka.make_request('student_profile', { "path": "update_education_details", "body": req.body }, function (err, result) {
        console.log("got back from update_education_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                educationDetails: result.educationDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/deleteEducationDetails', checkStudentAuth, function (req, res) {
    console.log('inside update education api');

    kafka.make_request('student_profile', { "path": "delete_education_details", "body": req.body }, function (err, result) {
        console.log("got back from delete_education_details kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                educationDetails: result.educationDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.get('/getExperience', checkStudentAuth, function (req, res) {
    console.log('inside get experience api');

    kafka.make_request('student_profile', { "path": "get_experience", "body": req.query }, function (err, result) {
        console.log("got back from get_experience kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                experienceDetails: result.experienceDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/addExperience', checkStudentAuth, function (req, res) {
    console.log('inside addExperience api');

    kafka.make_request('student_profile', { "path": "add_experience", "body": req.body }, function (err, result) {
        console.log("got back from add_experience kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                experienceDetails: result.experienceDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/updateExperience', checkStudentAuth, function (req, res) {
    console.log('inside updateExperience api');

    kafka.make_request('student_profile', { "path": "update_experience", "body": req.body }, function (err, result) {
        console.log("got back from update_experience kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                experienceDetails: result.experienceDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})

router.post('/deleteExperience', checkStudentAuth, function (req, res) {
    console.log('inside deleteExperience api');

    kafka.make_request('student_profile', { "path": "delete_experience", "body": req.body }, function (err, result) {
        console.log("got back from delete_experience kafka");
        if (err) {
            console.log('error', err)
            res.end();
        } else {
            console.log("result", result);
            var payload = {
                experienceDetails: result.experienceDetails
            }
            var token = jwt.sign(payload, secret, {
                expiresIn: 1008000 // in seconds
            });
            res.end(JSON.stringify({ token: "JWT " + token }))
        }
    });
})
module.exports = router;