import React, { Component } from 'react';
import Navbar from "../Navbar/Navbar";
import cookie from "react-cookies";
import { Redirect, Link } from 'react-router-dom';

class OtherCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CID: this.props.location.state.companyID,
            profilePic: "",
            backPath: this.props.location.state.backPath
        }
    }
    render() {
        let contactOrForm = null, companyOrForm = null, redirectVar = null;
        if (!cookie.load('SID')) {
            redirectVar = <Redirect to="/studentSignIn" />;
        }

        contactOrForm =
            <div>
                <h5>Email: {this.state.CID.email}</h5>
                <h5>Phone: {this.state.CID.phone}</h5>
            </div>


        companyOrForm =
            <div>
                <div className='row'>
                    <div className='col'>
                        <h1>{this.state.CID.companyName}</h1>
                    </div>
                </div>
                <div style={{ marginTop: '10px' }}><h5>{this.state.CID.location}</h5></div>
                <div style={{ marginTop: '20px' }}>
                    <h4>Description:</h4>
                    <h4>{this.state.CID.description}</h4>
                </div>
            </div>

        return (
            <div className='container'>
                {redirectVar}
                <Navbar />
                <div style={{ textAlign: 'center' }} className='col-md-5'>
                    <div className='row'>
                        <div style={{ marginTop: '5px' }} className='col-5'>
                            <Link to={{ pathname: this.state.backPath }} style={{ marginTop: "0px" }}>Back</Link>
                            <img src={this.state.CID.profilePic} style={{ height: '150px', weight: '100px' }}></img>
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
export default OtherCompany;