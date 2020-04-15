import React, { Component } from 'react';
import cookie from 'react-cookies';
import { studentGetAppliedJobs } from '../../js/actions/jobsAction';
import { connect } from "react-redux";

class JobApplications extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: [],
            pageNO: 1,
            pendingFlag: false,
            reviewedFlag: false,
            declinedFlag: false
        }
        this.getAppliedJobs = this.getAppliedJobs.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.createFilter = this.createFilter.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    componentDidMount() {
        this.getAppliedJobs();
    }
    next = () => {
        this.setState({
            pageNO: this.state.pageNO + 1
        }, () => this.getAppliedJobs())
    }
    previous = () => {
        this.setState({
            pageNO: this.state.pageNO - 1
        }, () => this.getAppliedJobs())
    }
    getAppliedJobs = () => {
        let data = {
            SID: cookie.load("SID"),
            filter: this.state.filter,
            pageNO: this.state.pageNO
        }
        this.props.studentGetAppliedJobs(data);
    }
    changeStatus = (status) => {
        switch (status) {
            case "Pending":
                this.setState({
                    pendingFlag: !this.state.pendingFlag
                }, () => {
                    this.createFilter();
                })
                break;
            case "Reviewed":
                this.setState({
                    reviewedFlag: !this.state.reviewedFlag
                }, () => {
                    this.createFilter();
                })
                break;
            case "Declined":
                this.setState({
                    declinedFlag: !this.state.declinedFlag
                }, () => {
                    this.createFilter();
                })
                break;
        }
    }
    createFilter = () => {
        let filter = [];
        if (this.state.pendingFlag) {
            filter.push("Pending");
        }
        if (this.state.reviewedFlag) {
            filter.push("Reviewed");
        }
        if (this.state.declinedFlag) {
            filter.push("Declined");
        }
        this.setState({
            filter: filter
        }, () => { this.getAppliedJobs() })
    }
    render() {
        let appliedJobsElement = null;

        appliedJobsElement = this.props.appliedJobs.map(job => {
            let status = "";
            let appliedStudent = job.appliedStudents.filter(student => student._id === cookie.load("SID"));
            console.log("applied student", appliedStudent)
            return (
                <tr>
                    <td style={{ textAlign: 'center' }}>
                        <h4>{job.title}</h4>
                        <p>{job.location}</p>
                        <p>{job.companyName}</p>
                        <p>Applied On: {new Date(appliedStudent[0].applicationDate).getMonth() + 1}-{new Date(appliedStudent[0].applicationDate).getDate()}-{new Date(appliedStudent[0].applicationDate).getFullYear()}</p>
                        <p>Status: {appliedStudent[0].status}</p>
                    </td>
                </tr>
            )
        })

        return (
            <div className="container">
                <button className={this.state.pendingFlag ? "btn btn-primary btn_xs" : 'btn btn-default btn-xs'} onClick={() => this.changeStatus("Pending")}>Pending</button>
                <button className={this.state.reviewedFlag ? "btn btn-primary btn_xs" : 'btn btn-default btn-xs'} onClick={() => this.changeStatus("Reviewed")}>Reviewed</button>
                <button className={this.state.declinedFlag ? "btn btn-primary btn_xs" : 'btn btn-default btn-xs'} onClick={() => this.changeStatus("Declined")}>Declined</button>
                <table style={{ marginTop: '15px' }} className="table">
                    <tbody>
                        {appliedJobsElement}
                        <button style={this.state.pageNO === 1 ? { display: "none" } : null} onClick={this.previous}>Back</button>
                        <button style={{ marginLeft: "250px" }} onClick={this.next}>Next</button>
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        appliedJobs: state.StudentJob.appliedJobs
    }
}
export default connect(mapStateToProps, { studentGetAppliedJobs })(JobApplications);