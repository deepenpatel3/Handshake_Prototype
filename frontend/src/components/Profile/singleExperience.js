import React, { Component } from 'react';
import cookie from 'react-cookies';
import { connect } from "react-redux";
import { studentUpdateExperience, studentDeleteExperience } from "../../js/actions/profileAction";

class SingleExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: this.props.item._id,
            companyName: this.props.item.companyName,
            title: this.props.item.title,
            location: this.props.item.location,
            startDate: this.props.item.startDate,
            endDate: this.props.item.endDate,
            description: this.props.item.description,
            editFlag: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete = () => {
        let data = {
            _id: this.state.ID,
            SID: cookie.load("SID")
        }
        this.props.studentDeleteExperience(data);
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
    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            _id: this.state.ID,
            SID: cookie.load("SID"),
            companyName: document.getElementById("companyName").value,
            title: document.getElementById("title").value,
            location: document.getElementById("location").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            description: document.getElementById("description").value
        }
        await this.props.studentUpdateExperience(data);
        this.setState({
            editFlag: false
        })
    }
    render() {
        let singleExp = null;
        if (this.state.editFlag === false) {
            singleExp =
                <div>
                    <table>
                        <tbody><tr>
                            <td>As a {this.state.title}</td>
                            <td align="right" rowspan="4"><button onClick={this.handleEdit} className="btn btn-primary btn-xs">Edit</button><br />
                                <button onClick={this.handleDelete} className="btn btn-danger btn-xs">Delete</button>
                            </td>
                        </tr>
                            <tr>
                                <td> At {this.state.companyName}, Located at {this.state.location}</td>
                            </tr>
                            <tr>
                                <td> From {this.state.startDate} to {this.state.endDate}</td>
                            </tr>
                            <tr>
                                <td>Description: {this.state.description}</td>
                            </tr>
                            <br />
                        </tbody>
                    </table>
                </div>
        } else {
            singleExp =
                <div>
                    <form className="container">
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="companyName"
                            name="companyName"
                            placeholder="Name of Company"
                            required
                            autoFocus />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="title"
                            name="title"
                            placeholder="Title of Experience"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="date"
                            id="startDate"
                            name="startDate"
                            placeholder="Start Date"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="date"
                            id="endDate"
                            name="endDate"
                            placeholder="End Date"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Description"
                            required />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-danger" onClick={this.handleCancel}>Cancel</button>
                        <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-success" onClick={this.handleSave}>Save</button>
                    </form>
                </div>
        }
        return (
            <div>
                <div key={this.props.item._id}>
                </div>
                {singleExp}
            </div>
        );
    }
}

export default connect(null, { studentUpdateExperience, studentDeleteExperience })(SingleExperience);





