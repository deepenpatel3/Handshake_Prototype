import React, { Component } from 'react';
import cookie from "react-cookies";
import { connect } from "react-redux";
import { studentGetExperience, studentAddExperience } from "../../js/actions/profileAction";
import SingleExperience from './singleExperience';

class Experience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFlag: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentWillMount() {
        this.props.studentGetExperience();
    }

    handleToggle = () => {
        // console.log('addflag after add button: before toggling', this.state.addFlag)
        if (this.state.addFlag === true) {
            this.setState({
                addFlag: false
            })

        } else {
            this.setState({
                addFlag: true
            })
        }
        // console.log('addflag after add button: after toggling', this.state.addFlag)
    }

    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            SID: cookie.load("SID"),
            companyName: document.getElementById("companyName").value,
            title: document.getElementById("title").value,
            location: document.getElementById("location").value,
            startDate: document.getElementById("startDate").value,
            endDate: document.getElementById("endDate").value,
            description: document.getElementById("description").value
        }
        await this.props.studentAddExperience(data);
        this.setState({
            addFlag: false
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let educationElement = null;
        if (this.state.addFlag === true) {
            educationElement =
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
                            placeholder="description"
                            required />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-danger" onClick={this.handleToggle}>Cancel</button>
                        <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-success" onClick={this.handleSave}>Save</button>

                    </form>
                </div>
        } else {
            educationElement =
                <div>
                    <tr>
                        <td>
                            {this.props.experienceDetails.map(single => <SingleExperience key={single._id} item={single} />)}
                            <div><button style={{ marginTop: '20px' }} className="btn btn-primary" onClick={this.handleToggle}>Add Experience</button></div>

                        </td>
                    </tr>

                </div>
        }
        return (
            <div className="container">
                <label>Experience</label>
                <table className="table table-borderless">
                    <tbody>
                        {/* <h1>{this.props.experienceDetails}</h1> */}
                        {educationElement}
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        experienceDetails: state.StudentProfile.experienceDetails
    }
}
export default connect(mapStateToProps, { studentGetExperience, studentAddExperience })(Experience);