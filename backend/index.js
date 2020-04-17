//import the require dependencies
const { mongoDB, frontendURL } = require("./src/Utils/config");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
var multer = require('multer');
var path = require('path');
const Students = require("./src/Models/studentModel");
const Company = require("./src/Models/companyModel");
const Jobs = require("./src/Models/jobModel");

app.use(cors({ origin: frontendURL, credentials: true }));

app.use(cookieParser());
//use express session to maintain session data
app.use(
    session({
        secret: "cmpe273_handshake_clone",
        resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
        saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
        duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
        activeDuration: 5 * 60 * 1000
    })
);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const storage = multer.diskStorage({
    // destination: '/uploads/',
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
})
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", frontendURL);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,HEAD,OPTIONS,POST,PUT,DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Cache-Control", "no-cache");
    next();
});

const mongoose = require('mongoose');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});
var collections = mongoose.connections[0].collections;
var names = [];

Object.keys(collections).forEach(function (k) {
    names.push(k);
});

console.log("collections- ", names);

const studentAccount = require("./src/routes/student/Account");
const companyAccount = require("./src/routes/company/Account");
const studentProfile = require("./src/routes/student/Profile");
const companyProfile = require("./src/routes/company/Profile");
const companyJobs = require("./src/routes/company/Jobs");
const studentJobs = require("./src/routes/student/Jobs");
const companyEvents = require("./src/routes/company/Events");
const studentEvents = require("./src/routes/student/Events");
const studentStudents = require("./src/routes/student/Student");
const studentMessages = require("./src/routes/student/Message");

app.use("/company/account", companyAccount);
app.use("/student/account", studentAccount);
app.use("/student/profile", studentProfile);
app.use("/company/profile", companyProfile);
app.use("/company/jobs", companyJobs);
app.use("/student/jobs", studentJobs);
app.use("/company/events", companyEvents);
app.use("/student/events", studentEvents);
app.use("/student/students", studentStudents);
app.use("/student/message", studentMessages);

app.post('/updateProfilePic', upload.single('profilePic'), function (req, res) {
    console.log("Inside update profile picture");
    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.path;
    // console.log('imagepath- ', imagepath, " & type of imagehath- ", typeof (imagepath));
    console.log('sid', req.body.SID)

    Students.findByIdAndUpdate({ _id: req.body.SID }, { profilePic: imagepath }, { new: true })
        .then(student => {
            if (student) {
                console.log('profilePicURL: ', student.profilePic);
                res.redirect(frontendURL + '/profile');
            }
            else {
                console.log('wrong student id')
                res.status(401).end("wrong student id")
            }
        })
        .catch(error => {
            console.log('update student profile picture error', error)
        })
});

app.post('/updateCompanyProfilePic', upload.single('profilePic'), function (req, res) {
    console.log("Inside update company profile picture");
    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.path;
    console.log('imagepath- ', imagepath);
    console.log('Cid', req.body.CID)

    Company.findByIdAndUpdate({ _id: req.body.CID }, { profilePic: imagepath }, { new: true })
        .then(company => {
            if (company) {
                console.log('company:- ', company);
                res.redirect(frontendURL + '/companyProfile');
            }
            else {
                console.log('wrong company id')
                res.status(401).end("wrong company id")
            }
        })
        .catch(error => {
            console.log('update company profile picture error', error)
        })
});

app.get('/getProfilePic', function (req, res) {
    // console.log('req body', req.query)
    Students.findById({ _id: req.query.SID })
        .then(student => {
            if (student) {
                res.status(200).end(student.profilePic);
            }
            else {
                console.log('wrong student id')
                res.status(401).end("wrong student id")
            }
        })
        .catch(error => {
            console.log(' get student profile picture error', error)
        })
});

app.get('/getCompanyProfilePic', function (req, res) {
    // console.log('req body', req.query)
    Company.findById({ _id: req.query.CID })
        .then(company => {
            if (company) {
                res.status(200).end(company.profilePic);
            }
            else {
                console.log('wrong student id')
                res.status(401).end("wrong student id")
            }
        })
        .catch(error => {
            console.log('get company profile picture error', error)
        })
});
app.post('/apply', upload.single('resume'), function (req, res) {
    console.log("inside apply job api")
    console.log('req body', req.body)
    let SID = req.body.SID;
    var host = req.hostname;
    console.log("Hostname", host)
    console.log("File", req.file)
    var imagepath = req.protocol + "://" + host + ':3001/' + req.file.path;
    console.log('imagepath', imagepath);

    Jobs.findByIdAndUpdate({ _id: req.body.ID },
        { $push: { appliedStudents: { _id: req.body.SID, status: "Pending", resume: imagepath } } }, (err, result) => {
            if (err) {
                console.log("job apply error- ", err)
            }
            else {
                res.redirect(frontendURL + "/jobs");
            }
        })
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
