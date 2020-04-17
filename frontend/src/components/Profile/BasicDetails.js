import Modal from 'react-modal';
import React, { Component } from 'react';
import cookie from "react-cookies";
import { connect } from "react-redux";
import { studentGetBasicDetails, studentUpdateBasicDetails } from "../../js/actions/profileAction";
import axios from 'axios';
const { backendURL } = require("../../Config");

class BasicDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePic: "",
            editFlag: false,
            modalIsOpen: false
        }
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.setModalIsOpen = this.setModalIsOpen.bind(this);
    }
    setModalIsOpen = (value) => {
        this.setState({
            modalIsOpen: value
        })
    }
    componentWillMount() {
        this.props.studentGetBasicDetails();
        let data = {
            SID: cookie.load("SID")
        }
        axios({
            url: backendURL + '/getProfilePic',
            method: "GET",
            params: data
        })
            .then(response => {
                // console.log("student basic details", response.data);
                this.setState({
                    profilePic: response.data
                })
            })
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
    handleSave = () => {
        this.props.studentUpdateBasicDetails({
            SID: cookie.load("SID"),
            name: document.getElementById("name").value,
            city: document.getElementById("city").value,
            school: document.getElementById("school").value
        });
        this.setState({
            editFlag: false
        })
    }
    openModel = () => {

    }
    render() {
        let infoOrForm = null;
        // console.log('Rerender with edit flag', this.state.editFlag);
        if (this.state.editFlag === false) {
            infoOrForm =
                <div className='row'>
                    <div className='col'>
                        <p >{this.props.name}</p>
                        <p >{this.props.school}</p>
                        <p >{this.props.city}</p>
                    </div>
                    <div className='col-1'>
                        <button onClick={this.handleEdit} className="btn btn-lg"><i class="fa fa-edit" /></button>
                    </div>
                </div>
        }
        else {
            infoOrForm =
                <div>
                    <tr>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                onChange={this.handleChange}
                                required
                                autoFocus />
                        </td>
                    </tr><br />
                    <tr>
                        <td>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                onChange={this.handleChange}
                                required />
                        </td>
                    </tr><br />
                    <tr>
                        <td>
                            <input
                                type="text"
                                id="school"
                                name="school"
                                placeholder="School"
                                onChange={this.handleChange}
                                required />
                        </td>
                    </tr><br />
                    <tr>
                        <td>
                            <button className="btn btn-danger btn-xs" onClick={this.handleCancel}>Cancel</button>
                            <button style={{ marginLeft: '20px' }} className="btn btn-success btn-xs" onClick={this.handleSave}>Save</button>
                        </td>
                    </tr>
                </div>

        }
        return (
            <div className="container">
                <div style={{}} className='col-md-6'>
                    <div>
                        <img src={this.state.profilePic} className="responsive" style={{ width: "100%", height: "auto" }}></img>

                    </div>
                </div>
                <div className='col-md-6'>
                    {infoOrForm}
                </div>
                <button className="btn btn-lg" onClick={() => this.setModalIsOpen(true)}><i class="fa fa-edit" /></button>
                <Modal isOpen={this.state.modalIsOpen}>
                    <form className='md-form' action={backendURL + "/updateProfilePic"} method="POST" encType='multipart/form-data' >
                        <input style={{ display: "none" }} name='SID' value={cookie.load("SID")}></input>
                        <input className="file-field" type='file' name='profilePic' id='profilePic'></input>
                        <button className='btn btn-primary' type='submit'>Save</button>
                    </form>
                    <button onClick={() => this.setModalIsOpen(false)}>close</button>
                </Modal>

            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        name: state.StudentProfile.name,
        school: state.StudentProfile.school,
        city: state.StudentProfile.city
    }
}
export default connect(mapStateToProps, { studentGetBasicDetails, studentUpdateBasicDetails })(BasicDetails);