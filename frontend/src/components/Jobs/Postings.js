import React, { Component } from 'react';
import { studentGetJobs } from '../../js/actions/jobsAction';
import { connect } from "react-redux";
import cookie from "react-cookies";
import { backendURL } from "../../Config";
import { Link } from "react-router-dom";

class Postings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            filters: [],
            titleOrCompany: "",
            location: "",
            sort: "",

            appliedFlag: false,
            firstJob: {},
            fullTimeFlag: false,
            partTimeFlag: false,
            onCampusFlag: false,
            internshipFlag: false,
            // locationFlag: false,
            // searchFlag: false,
            applyFlag: false
            // filteredJobs: []
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.showJob = this.showJob.bind(this);
        this.getJobs = this.getJobs.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.createFilter = this.createFilter.bind(this);
        this.handleApply = this.handleApply.bind(this);
        this.sort = this.sort.bind(this);
    }
    componentDidUpdate(prevProps, nextState) {
        if (prevProps.jobs !== this.props.jobs) {
            if (this.props.jobs.length > 0) {
                this.setState({
                    firstJob: this.props.jobs[0]
                }, () => {
                    if (!this.state.firstJob.appliedStudents.length) {
                        this.setState({ appliedFlag: false }, () => { document.getElementById("apply").disabled = false })
                    }
                    else {
                        this.state.firstJob.appliedStudents.forEach(student => {
                            if (student._id === cookie.load("SID")) {
                                // console.log("student--", student)
                                this.setState({ appliedFlag: true }, () => { document.getElementById("apply").disabled = true })
                            }
                            else {
                                // console.log("insde else")
                                this.setState({ appliedFlag: false }, () => { document.getElementById("apply").disabled = false })
                            }
                        })
                    }
                })
            } else {
                this.setState({ firstJob: {} })
            }
        }
    }
    componentDidMount() {
        this.getJobs();
    }
    getJobs = () => {
        let data = {
            pageNO: this.state.pageNO,
            filter: this.state.filters,
            titleOrCompany: this.state.titleOrCompany,
            location: this.state.location,
            sort: this.state.sort,
        }
        this.props.studentGetJobs(data);
    }
    showJob = (job) => {
        this.setState({
            firstJob: job
        }, () => {
            if (!this.state.firstJob.appliedStudents.length) {
                this.setState({ appliedFlag: false }, () => { document.getElementById("apply").disabled = false })
            }
            else {
                this.state.firstJob.appliedStudents.forEach(student => {
                    if (student._id === cookie.load("SID")) {
                        // console.log("student--", student)
                        this.setState({ appliedFlag: true }, () => { document.getElementById("apply").disabled = true })
                    }
                    else {
                        // console.log("insde else")
                        this.setState({ appliedFlag: false }, () => { document.getElementById("apply").disabled = false })
                    }
                })
            }
        })
    }
    next = () => {
        this.setState({
            pageNO: this.state.pageNO + 1
        }, () => this.getJobs())
    }
    previous = () => {
        this.setState({
            pageNO: this.state.pageNO - 1
        }, () => this.getJobs())
    }
    handleReset = () => {
        this.setState({
            // filter: [],
            // filteredJobs: [],
            // fullTimeFlag: false,
            // partTimeFlag: false,
            // onCampusFlag: false,
            // internshipFlag: false,
            locationFlag: false,
            searchFlag: false
        })
    }
    changeStatus = (status) => {
        switch (status) {
            case "full_time":
                this.setState({
                    fullTimeFlag: !this.state.fullTimeFlag
                }, () => {
                    this.createFilter();
                })
                break;
            case "part_time":
                this.setState({
                    partTimeFlag: !this.state.partTimeFlag
                }, () => {
                    this.createFilter();
                })
                break;
            case "internship":
                this.setState({
                    internshipFlag: !this.state.internshipFlag
                }, () => {
                    this.createFilter();
                })
                break;
            case "on_campus":
                this.setState({
                    onCampusFlag: !this.state.onCampusFlag
                }, () => {
                    this.createFilter();
                })
                break;
        }
    }
    createFilter = () => {
        let filter = [];
        if (this.state.fullTimeFlag) {
            filter.push("full_time");
        }
        if (this.state.partTimeFlag) {
            filter.push("part_time");
        }
        if (this.state.internshipFlag) {
            filter.push("internship");
        }
        if (this.state.onCampusFlag) {
            filter.push("on_campus");
        }
        this.setState({
            filters: filter
        }, () => { this.getJobs() })
    }

    handleSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => { this.getJobs() })
    }
    sort = (e) => {
        this.setState({
            sort: e.target.value
        }, () => this.getJobs())
    }
    handleApply = () => {
        this.setState({
            applyFlag: true
        })
    }
    render() {
        // console.log("applied flag----- ", this.state.appliedFlag)
        var jobelement = null, alertElement = null;

        jobelement = this.props.jobs.map(job => {
            return (
                <div className="container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <button onClick={() => this.showJob(job)} className="btn">
                                        <ul style={{ textAlign: 'left' }}>
                                            <li>{job.title}</li>
                                            <li>{job.companyID.companyName}</li>
                                            <li>At {job.location}</li>
                                            <li>{job.category}</li>
                                            <li>Posted On: {new Date(job.postingDate).getMonth() + 1}-{new Date(job.postingDate).getDate()}-{new Date(job.postingDate).getFullYear()}</li>
                                            <li>Application Deadline: {new Date(job.deadline).getMonth() + 1}-{new Date(job.deadline).getDate()}-{new Date(job.deadline).getFullYear()}</li>
                                        </ul>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )
        })

        // console.log('first job', this.state.firstJob)
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div style={{ marginTop: '15px', marginBottom: '15px' }} class="form-inline">
                            <input style={{ width: '50%' }} name="titleOrCompany" onChange={this.handleSearch} class="form-control" placeholder="Search jobs by Title or Company Name..." />
                            <input style={{ width: '50%' }} name="location" onChange={this.handleSearch} class="form-control" placeholder="Filter jobs by city..." />
                        </div>
                    </div>
                </div>
                <div className='row' style={{ marginBottom: '15px' }}>
                    <div className="col" ><button className={this.state.fullTimeFlag ? "btn btn-primary btn-xs" : "btn btn-default btn-xs"} name='full_time' onClick={() => this.changeStatus("full_time")} >Full Time</button></div>
                    <div className='col'><button name='part_time' onClick={() => this.changeStatus("part_time")} className={this.state.partTimeFlag ? "btn btn-primary btn-xs" : "btn btn-default btn-xs"}>Part Time</button></div>
                    <div className='col'><button name='on_campus' onClick={() => this.changeStatus("on_campus")} className={this.state.onCampusFlag ? "btn btn-primary btn-xs" : "btn btn-default btn-xs"}>On Campus</button></div>
                    <div className='col'><button name='internship' onClick={() => this.changeStatus("internship")} className={this.state.internshipFlag ? "btn btn-primary btn-xs" : "btn btn-default btn-xs"}>Internship</button></div>
                    <div className='col'><button onClick={this.handleReset} className="btn btn-default btn-xs">Reset</button></div>
                    <select name="sort" onChange={this.sort} defaultValue="">
                        <option value=""></option>
                        <option value="postingDate"> Posting Date - Increasing</option>
                        <option value="-postingDate"> Posting Date - Decreasing</option>
                        <option value="deadline"> Deadline - Increasing</option>
                        <option value="-deadline"> Deadline - Decreasing</option>
                        <option value="location"> Location - A -> Z</option>
                        <option value="-location"> Location - Z -> A</option>
                    </select>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            {jobelement}
                            {/* {alertElement} */}
                            <button style={this.state.pageNO === 1 ? { display: "none" } : null} onClick={this.previous}>Back</button>
                            <button style={{ marginLeft: "250px" }} onClick={this.next}>Next</button>
                        </div>
                        <div className="col">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <h1>{this.state.firstJob.title}</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p><Link to={{
                                            pathname: "/otherCompany",
                                            state: {
                                                companyID: this.state.firstJob.companyID,
                                                backPath: '/jobs'
                                            }
                                        }}> {this.state.firstJob.companyName}</Link></p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>{this.state.firstJob.category}</p>
                                    </div>
                                    <div className="col">
                                        <p>{this.state.firstJob.location}</p>
                                    </div>
                                    <div className="col">
                                        <p>{this.state.firstJob.salary}</p>
                                    </div>
                                    <div className="col">
                                        <p>{this.state.firstJob.postingDate}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>Applications close on {this.state.firstJob.deadline}</p>
                                    </div>
                                    <div className="col-1">
                                        {this.state.applyFlag ?
                                            <form action={backendURL + '/apply'} method='post' encType='multipart/form-data'>
                                                <input style={{ display: "none" }} name="SID" value={cookie.load("SID")}></input>
                                                <input style={{ display: 'none' }} name='ID' value={this.state.firstJob._id}></input>
                                                <input type='file' name='resume'></input>
                                                <button type='submit'>Apply</button>
                                            </form> : <button id="apply" className="btn btn-primary btn-xs" onClick={this.handleApply}>Apply</button>}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <p>Job Description:  {this.state.firstJob.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        jobs: state.StudentJob.jobs
    }
}
export default connect(mapStateToProps, { studentGetJobs })(Postings);