import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import cookie from "react-cookies";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { companyGetDetails, companyUpdateContactDetails, companyUpdateBasicDetails } from "../../js/actions/profileAction";
import axios from "axios";
const { backendURL } = require("../../Config");

class CompanyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: "",
            contactFlag: false,
            companyEditFlag: false
        }
        this.editContact = this.editContact.bind(this);
        this.updateContact = this.updateContact.bind(this);
        this.handleCompanyEdit = this.handleCompanyEdit.bind(this);
        this.updateCompanyDetails = this.updateCompanyDetails.bind(this);
    }
    componentDidMount() {
        console.log("inside COMPONENT DIDMOUNT")
        this.props.companyGetDetails();
        let data = {
            CID: cookie.load("CID")
        }
        axios({
            url: backendURL + '/getCompanyProfilePic',
            method: "GET",
            params: data
        })
            .then(response => {
                console.log("company profile pic", response.data);
                this.setState({
                    profilePic: response.data
                })
            })
    }
    updateContact = (e) => {
        e.preventDefault();
        let data = { email: document.getElementById('email').value, phone: document.getElementById('phone').value, CID: cookie.load("CID") }
        this.props.companyUpdateContactDetails(data);
        this.setState({
            contactFlag: false
        })
    }
    editContact = () => {
        this.setState({
            contactFlag: true
        })
    }
    handleCancel = () => {
        this.setState({
            contactFlag: false,
            companyEditFlag: false
        })
    }
    handleCompanyEdit = () => {
        this.setState({
            companyEditFlag: true
        })
    }
    updateCompanyDetails = (e) => {
        e.preventDefault();
        let data = {
            companyName: document.getElementById('companyName').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            CID: cookie.load("CID")
        }
        this.props.companyUpdateBasicDetails(data);
        this.setState({
            companyEditFlag: false
        })
    }
    render() {
        let contactOrForm = null, companyOrForm = null, redirectVar = null;
        if (!cookie.load('CID')) {
            redirectVar = <Redirect to="/companySignIn" />;
        }
        if (this.state.contactFlag) {
            contactOrForm =
                <div>
                    <form className="form-group" onSubmit={this.updateContact}>
                        <input className="form-control" type='text' id='email' name='email' placeholder='Enter your email' required autoFocus />
                        <input className="form-control" type='text' id='phone' name='phone' placeholder='Enter your phone' required />
                        <button type="submit" style={{ marginTop: '10px' }} className='btn btn-success btn-xs' >Save</button>
                        <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>

        } else {
            contactOrForm =
                <div>
                    <div className='row'>
                        <div className='col' style={{ marginTop: '3px' }}>
                            <label>Contact US at:</label>
                        </div>
                        <div className='col'>
                            <button className='btn btn-default btn-xs' onClick={this.editContact}>Edit</button>
                        </div>
                    </div>
                    <h5>Email: {this.props.email}</h5>
                    <h5>Phone: {this.props.phone}</h5>
                </div>
        }
        if (this.state.companyEditFlag) {
            companyOrForm =
                <div>
                    <form className="form-group" onSubmit={this.updateCompanyDetails}>
                        <input className="form-control" type='text' id='companyName' placeholder='Enter Company name' required autoFocus />
                        <input className="form-control" type='text' id='location' placeholder='Location' required />
                        <input className="form-control" type='text' id='description' placeholder='Descrption' required />
                        <button type="submit" style={{ marginTop: '10px' }} className='btn btn-success btn-xs' >Save</button>
                        <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
        } else {
            companyOrForm =
                <div>
                    <div className='row'>
                        <div className='col'>
                            <h1>{this.props.companyName}</h1>
                        </div>
                        <div className='col'>
                            <button className='btn btn-default btn-xs' onClick={this.handleCompanyEdit}>Edit</button>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px' }}><h5>{this.props.location}</h5></div>
                    <div style={{ marginTop: '20px' }}>
                        <h4>Description:</h4>
                        <h4>{this.props.description}</h4>
                    </div>
                </div>
        }
        return (
            <div className='container'>
                {redirectVar}
                <CompanyNavbar />
                <div style={{ textAlign: 'center' }} className='col-md-5'>
                    <div className='row'>
                        <div style={{ marginTop: '5px' }} className='col-5'>

                            <img src={this.state.profilePic} style={{ height: '150px', weight: '100px' }}></img>
                            <form action={backendURL + "/updateCompanyProfilePic"} method="POST" encType='multipart/form-data' >
                                <input style={{ display: "none" }} name='CID' value={cookie.load("CID")}></input>
                                <input type='file' name='profilePic' id='profilePic'></input>
                                <button className='btn btn-primary' type='submit'>Save</button>
                            </form>
                        </div>
                        <div style={{ marginTop: '6px', textAlign: 'left' }} className='col-7'>
                            {contactOrForm}
                        </div>
                    </div>
                </div>
                <div className='col-md-7'>
                    {companyOrForm}
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        companyName: state.CompanyProfile.companyName,
        email: state.CompanyProfile.email,
        phone: state.CompanyProfile.phone,
        description: state.CompanyProfile.description,
        location: state.CompanyProfile.location
    }
}

export default connect(mapStateToProps, { companyGetDetails, companyUpdateContactDetails, companyUpdateBasicDetails })(CompanyProfile);