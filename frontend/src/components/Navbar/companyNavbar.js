import React, { Component } from "react";
import { Link } from "react-router-dom";
import cookie from "react-cookies";
import 'bootstrap/dist/css/bootstrap.min.css';

//create the Navbar Component
class CompanyNavbar extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove("CID", { path: "/" });
        cookie.remove("company", { path: "/" });
        cookie.remove("companyToken", { path: "/" });
    };
    render() {
        return (
            <div>
                <nav className="navbar navbar-default" >
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <div >
                                <Link to="/companyProfile" ><strong>Handshake</strong></Link>
                            </div>
                        </div>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/companyMessages"><strong>Messages</strong></Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/companyJobs"><strong>Jobs</strong></Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/companyEvents"><strong>Events</strong></Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/companyStudents"><strong>Students</strong></Link>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav ">
                            <li>
                                <Link to="/" onClick={this.handleLogout}>
                                    <span className="glyphicon glyphicon-user"></span><strong>Logout</strong>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav >
            </div >
        );
    }
}


export default CompanyNavbar;
