import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { Link, Redirect } from "react-router-dom";
import cookie from "react-cookies";

class OtherStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            student: this.props.location.state.student,
            path: this.props.location.state.path
        }
    }
    render() {
        let redirectVar = null;
        let educationElement = this.state.student.educationDetails.map(education => {
            return (
                <div>
                    <li className="list-group-item">{education.school}</li>
                    <li className="list-group-item">{education.location}</li>
                    <li className="list-group-item">{education.degree}</li>
                    <li className="list-group-item">{education.major}</li>
                    <li className="list-group-item">{education.gpa}</li>
                </div>
            )
        })
        let experienceElement = this.state.student.experienceDetails.map(experience => {
            return (
                <div>
                    <li className="list-group-item">{experience.title}</li>
                    <li className="list-group-item"> At {experience.companyName}, Located at {experience.location}</li>
                    <li className="list-group-item"> From {experience.startDate} to {experience.endDate}</li>
                    <li className="list-group-item">Description: {experience.description}</li>
                </div>
            )
        })
        let skillElement = this.state.student.skills.map(Skill => {
            return (<li className="list-group-item">{Skill}</li>)
        })
        return (
            <div className='container'>
                < CompanyNavbar />
                <Link to={this.state.path}>Back</Link>
                <div style={{ marginTop: '20px' }} >
                    <div className='col-md-4'>
                        <div style={{ textAlign: 'center' }}>
                            <div className='row'>
                                <div className='col-4'>
                                    <img style={{ height: '130px', weight: '90px' }} src={this.state.student.profilePic}></img>

                                </div>
                                <div className='col'>
                                    <ul className="list-group">
                                        <li className="list-group-item">{this.state.student.name}</li>
                                        <li className="list-group-item">{this.state.student.school}</li>
                                        <li className="list-group-item">{this.state.student._id}</li>
                                    </ul>
                                    <Link to={{
                                        pathname: "/chatHistory",
                                        state: {
                                            _id: this.state.student._id,
                                            name: this.state.student.name,
                                            path: cookie.load("SID") ? '/messages' : "/companyMessages"
                                        }
                                    }} style={{ float: "left", marginTop: "40px" }} className="btn btn-primary btn-xs">Message</Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <ul className="list-group">
                                <li className="list-group-item">Contact Information:</li>
                                <li className="list-group-item">{this.state.student.email}</li>
                            </ul>
                        </div>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <ul className="list-group">
                                <li className="list-group-item">Skills:</li>
                                <li className="list-group-item">{skillElement}</li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <ul className="list-group" style={{ textAlign: 'center' }}>
                            <li className="list-group-item"> Career Objective:</li>
                            <li className="list-group-item">{this.state.student.careerObjective}</li>
                        </ul>
                        <ul className="list-group" style={{ marginTop: '20px', textAlign: 'center' }}>
                            <li className="list-group-item"> Education Details:</li>
                            <li className="list-group-item">{educationElement}</li>
                        </ul>
                        <ul className="list-group" style={{ marginTop: '20px', textAlign: 'center' }}>
                            <li className="list-group-item"> Experience Details:</li>
                            <li className="list-group-item">{experienceElement}</li>
                        </ul>
                    </div>
                </div>
            </div >
        );
    }
}

export default OtherStudent;