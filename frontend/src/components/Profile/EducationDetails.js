import React, { Component } from 'react';
import { connect } from "react-redux";
import cookie from "react-cookies";
import SingleEducationDetails from './singleEducationDetails';
import { studentGetEducationDetails, studentAddEducationDetails } from "../../js/actions/profileAction";

class EducationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFlag: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        this.props.studentGetEducationDetails();
    }
    handleToggle = () => {
        if (this.state.addFlag === true) {
            this.setState({
                addFlag: false
            })
            // console.log('addflag after add button: after turning false', this.state.addFlag)
        } else {
            this.setState({
                addFlag: true
            })
            // console.log('addflag after add button: after turning true', this.state.addFlag)
        }
    }
    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            SID: cookie.load("SID"),
            school: document.getElementById("school").value,
            location: document.getElementById("location").value,
            degree: document.getElementById("degree").value,
            major: document.getElementById("major").value,
            passingYear: document.getElementById("passingYear").value,
            gpa: document.getElementById("gpa").value
        }
        await this.props.studentAddEducationDetails(data);
        this.setState({
            addFlag: false
        })
    }
    render() {
        // console.log("inside education render", this.props.educationDetails)
        let educationElement = null;
        if (this.state.addFlag === true) {
            educationElement =
                <div>
                    <form className="container">
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="school"
                            name="school"
                            placeholder="School"
                            required
                            autoFocus />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Location of School"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="degree"
                            name="degree"
                            placeholder="Degree"

                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="text"
                            id="major"
                            name="major"
                            placeholder="Major"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="number"
                            id="passingYear"
                            name="passingYear"
                            placeholder="Year of Graduation"
                            required />
                        <br />
                        <input
                            // style={{ marginTop: '20px' }}
                            type="number"
                            id="gpa"
                            name="gpa"
                            placeholder="GPA"
                            required />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleToggle}>Cancel</button>
                        <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>

                    </form>
                </div>
        } else {
            educationElement =
                <div>
                    <tr>
                        <td>
                            {this.props.educationDetails.map(single => <SingleEducationDetails key={single._id} item={single} />)}

                        </td>
                    </tr>
                </div>
        }
        return (
            <div className="container" >
                <label>Education Details</label>
                <button style={{ marginLeft: "545px", borderRadius: "30%" }} className="btn btn-secondary" onClick={this.handleToggle}>+</button>
                <table className="table table-borderless">
                    <tbody>
                        {educationElement}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        educationDetails: state.StudentProfile.educationDetails
    }
}
export default connect(mapStateToProps, { studentGetEducationDetails, studentAddEducationDetails })(EducationDetails);
