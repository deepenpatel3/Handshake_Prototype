import React, { Component } from 'react';
import { connect } from "react-redux";
import { studentUpdateEducationDetails, studentDeleteEducationDetails } from "../../js/actions/profileAction";
import cookie from "react-cookies";

class SingleEducationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editFlag: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete = () => {
        let data = {
            _id: this.props.item._id,
            SID: cookie.load("SID")
        }
        this.props.studentDeleteEducationDetails(data);
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
            SID: cookie.load("SID"),
            _id: this.props.item._id,
            school: document.getElementById("school").value,
            location: document.getElementById("location").value,
            degree: document.getElementById("degree").value,
            major: document.getElementById("major").value,
            passingYear: document.getElementById("passingYear").value,
            gpa: document.getElementById("gpa").value
        }
        await this.props.studentUpdateEducationDetails(data);
        this.setState({
            editFlag: false
        })

    }
    render() {
        // console.log("inside single education render---", this.state.school, ",", this.props.item.school)

        let singleEducation = null;
        if (this.state.editFlag === false) {
            // console.log('editflag inside false condition', this.state.editFlag);
            singleEducation =
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>{this.props.item.school}</td>
                                <td align="right" rowspan="5">
                                </td>
                            </tr>
                            <tr>
                                <td>{this.props.item.location}</td>
                            </tr>
                            <tr>
                                <td>{this.props.item.degree} in {this.props.item.major}</td>
                            </tr>
                            <tr>
                                <td>Gradutaion year: {this.props.item.passingYear}</td>
                            </tr>
                            <tr>
                                <td>GPA: {this.props.item.gpa}</td>
                            </tr>
                            <br />
                        </tbody>
                    </table>
                </div>
        } else {
            singleEducation =
                <div>
                    <form className="container">
                        <input
                            type="text"
                            id="school"
                            name="school"
                            placeholder="School"
                            required
                            autoFocus />
                        <br />
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location of School"
                            required />
                        <br />
                        <input
                            type="text"
                            id="degree"
                            name="degree"
                            placeholder="Degree"
                            required />
                        <br />
                        <input
                            type="text"
                            id="major"
                            name="major"
                            placeholder="Major"
                            required />
                        <br />
                        <input
                            type="number"
                            id="passingYear"
                            name="passingYear"
                            placeholder="Year of Graduation"
                            required />
                        <br />
                        <input
                            type="number"
                            id="gpa"
                            name="gpa"
                            placeholder="GPA"
                            required />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleCancel}>Cancel</button>
                        <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>
                    </form>
                </div>
        }
        return (
            <div key={this.props.item._id}>
                <div className="col-sm-1">
                    <button onClick={this.handleEdit} className="btn btn-lg"><i class="fa fa-edit" /></button><br />
                    <button onClick={this.handleDelete} className="btn btn-lg"><i class="fa fa-trash" /></button>
                </div>
                <div className="col-sm-10">
                    {singleEducation}
                </div>
            </div>
        );
    }
}
export default connect(null, { studentUpdateEducationDetails, studentDeleteEducationDetails })(SingleEducationDetails);





