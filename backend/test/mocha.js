var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("MochaTest", function () {

    //company sign in
    it("should login student", function (done) {
        server
            .post("/student/account/signIn")
            .send({ email: "darshit@ucla.edu", password: "Dd123456" })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();

            });
    });

    //student sign in
    it("should login company", function (done) {
        server
            .post("/company/account/signIn")
            .send({
                email: "google@google.com",
                password: "Gg123456"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            });
    });


    //company sign up
    it("Should sign up company", function (done) {
        server
            .post("/company/account/signUp")
            .send({
                companyName: "Amazon", email: "amazon@amazon.com", password: "Aa123456", location: "San Jose"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            });
    });


    // //student sign up
    it("Should sign up student", function (done) {
        server
            .post("/student/account/signUp")
            .send({
                name: "Narain", email: "narain@gmail.com", password: "Nn123456", city: "San Jose", school: "SJSU"
            })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            });
    });

    // //Education details
    it("should get all students", function (done) {
        server
            .get("/student/students/getStudents")
            .query({ ID: "5e978810c17e0d37d1e3de4c", pageNO: 1 })
            .expect(200)
            .end(function (err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            });
    });


});
