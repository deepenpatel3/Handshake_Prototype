import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { studentGetContactInfo, studentUpdateContactInfo } from '../../js/actions/profileAction';
import { connect } from "react-redux";
axios.defaults.withCredentials = true;

class ContactInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editFlag: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        this.props.studentGetContactInfo();
    }
    handleEdit = () => {
        this.setState({
            editFlag: true
        })
    }
    handleCancel = () => {
        this.setState({
            editFlag: false
        })
    }
    handleSave = (e) => {
        e.preventDefault();
        this.props.studentUpdateContactInfo({
            SID: cookie.load("SID"),
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value
        });
        this.setState({
            editFlag: false
        })
    }

    render() {
        let editButton = null;
        let infoOrForm = null;

        if (this.state.editFlag === false) {
            infoOrForm =
                <div style={{ marginTop: "10px" }} className="container" >
                    <p ><i style={{ fontSize: "15px" }} class="fa">&#xf0e0;</i><span style={{ marginLeft: "6px" }}>{this.props.email}</span><i style={{ fontSize: "15px", marginLeft: "10px" }} class="fa">&#xf095;</i><span style={{ marginLeft: "6px" }}>{this.props.phone}</span></p>

                </div>

            editButton = <button onClick={this.handleEdit} className="btn btn-lg"><i class="fa fa-edit" /></button>
        }
        else {
            infoOrForm =
                <form className="container">
                    <input
                        style={{ marginTop: '20px' }}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        required
                        autoFocus />
                    <br />
                    <input
                        style={{ marginTop: '20px' }}
                        type="text"
                        id="phone"
                        name="phone"
                        placeholder="phone"
                        required />
                    <br />
                    <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleCancel}>Cancel</button>
                    <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-xs btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>
                </form>
        }
        return (
            <div className="container">
                <label for="">Contact Information</label>
                {infoOrForm}
                {editButton}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        email: state.StudentProfile.email,
        phone: state.StudentProfile.phone
    }
}

export default connect(mapStateToProps, { studentGetContactInfo, studentUpdateContactInfo })(ContactInfo);