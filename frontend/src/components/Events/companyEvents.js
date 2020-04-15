import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { connect } from "react-redux";
import { companyGetEvents, companyPostEvent } from '../../js/actions/eventAction';
import cookie from "react-cookies";
import { Link, Redirect } from "react-router-dom";

class CompanyEvents extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNO: 1,
            firstEvent: {},
            addEventFlag: false,
            studentsFlag: false
        }
        this.getEvents = this.getEvents.bind(this);
        this.addEvent = this.addEvent.bind(this);
        this.showEvent = this.showEvent.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handlePost = this.handlePost.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    componentDidMount() {
        this.getEvents();
    }
    componentDidUpdate(prevProps, nextState) {
        if (prevProps.events !== this.props.events) {
            if (this.props.events.length > 0) {
                this.setState({
                    firstEvent: this.props.events[0]
                })
            }
        }
    }
    getEvents = () => {
        let data = { pageNO: this.state.pageNO, CID: cookie.load("CID") }
        this.props.companyGetEvents(data);
    }
    next = () => {
        this.setState({
            pageNO: this.state.pageNO + 1
        }, () => this.getEvents())
    }
    previous = () => {
        this.setState({
            pageNO: this.state.pageNO - 1
        }, () => this.getEvents())
    }
    addEvent = () => {
        this.setState({
            addEventFlag: true
        })
    }
    showEvent = (event) => {
        this.setState({
            firstEvent: event
        })
    }
    handleCancel = () => {
        this.setState({
            addEventFlag: false
        })
    }
    handlePost = async () => {
        // .preventDefault();
        let data = {
            CID: cookie.load("CID"),
            companyName: cookie.load("company"),
            name: document.getElementById('eventName').value,
            location: document.getElementById('location').value,
            description: document.getElementById('description').value,
            time: document.getElementById('time').value,
            date: document.getElementById('date').value,
            eligibility: document.getElementById('eligibility').value
        }
        await this.props.companyPostEvent(data);
        this.getEvents();
    }
    getStudents = () => {
        this.setState({
            studentsFlag: true
        })
    }
    render() {
        console.log("page no--", this.state.pageNO)
        let eventOrForm = null, studentsElement = null, eventElement = null, redirectVar = null, errorElement = null;
        if (!cookie.load('CID')) {
            redirectVar = <Redirect to="/companySignIn" />;
        }
        if (this.props.events.length > 0) {
            if (this.state.studentsFlag) {
                studentsElement = this.state.firstEvent.registeredStudents.map(student => {
                    return (
                        <ul>
                            <li><Link to={{
                                pathname: "/otherStudent",
                                state: {
                                    student: student._id,
                                    path: '/companyEvents'
                                }
                            }} style={{ color: 'black' }}>{student._id.name}</Link></li>
                        </ul>
                    )
                })
            } else {
                console.log("student flag:", this.state.studentsFlag)
                studentsElement = <button className='btn btn-primary btn-xs' onClick={this.getStudents}>Registered Students</button>
            }
            if (this.state.addEventFlag) {
                eventOrForm =
                    <div>
                        <form className="form-group" onSubmit={this.handlePost}>
                            <input className="form-control" type='text' id='eventName' placeholder='Event Title' required autoFocus />
                            <input className="form-control" type='text' id='location' placeholder='Venue' required />
                            <input className="form-control" type='text' id='description' placeholder='What is the event about?...' required />
                            <input className="form-control" type='time' id='time' placeholder='Time' required />
                            <input className="form-control" type='date' id='date' placeholder='Date' required />
                            <input className="form-control" type='text' id='eligibility' placeholder='Eligibility' />
                            <button style={{ marginTop: '10px' }} className='btn btn-success btn-xs' >Post</button>
                            <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                        </form>
                    </div>
            } else {
                eventOrForm =
                    <div>
                        <button style={{ float: 'right' }} className='btn btn-primary btn-xs' onClick={this.addEvent} >Post an Event</button>
                        <div className="row">
                            <div className="col">
                                <h1>{this.state.firstEvent.name}</h1>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>{this.state.firstEvent.location}</p>
                            </div>
                            <div className="col">
                                <p>Date: {new Date(this.state.firstEvent.date).getMonth() + 1}-{new Date(this.state.firstEvent.date).getDate()}-{new Date(this.state.firstEvent.date).getFullYear()}</p>
                            </div>
                            <div className="col">
                                <p>Time: {this.state.firstEvent.time}</p>
                            </div>
                            <div className="col">
                                <p>Eligibility: {this.state.firstEvent.eligibility}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>Event Description:  {this.state.firstEvent.description}</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {studentsElement}
                            </div>
                        </div>
                    </div>
            }
            eventElement = this.props.events.map(event => {
                return (
                    <div className="container">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button onClick={() => this.showEvent(event)} className="btn">
                                            <ul style={{ textAlign: 'left' }}>
                                                <li>{event.name}</li>
                                                <li>{event.date}</li>
                                                <li>{event.companyName}</li>
                                            </ul>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })
        } else {
            errorElement = <h3>Post the First Event</h3>
            eventOrForm =
                <div>
                    <form className="form-group">
                        Event Title: <input className="form-control" type='text' id='eventName' required autoFocus />
                        Venue: <input className="form-control" type='text' id='location' required />
                        Description:<input className="form-control" type='text' id='description' required />
                        Time: <input className="form-control" type='time' id='time' required />
                        Date:<input className="form-control" type='date' id='date' required />
                        Eligibility: <input className="form-control" type='text' id='eligibility' required />
                        <button style={{ marginTop: '10px' }} className='btn btn-success btn-xs' onClick={this.handlePost}>Post</button>
                        <button style={{ marginTop: '10px' }} className='btn btn-default btn-xs' onClick={this.handleCancel}>Cancel</button>
                    </form>
                </div>
        }
        return (
            <div>
                <div className='container'>
                    {redirectVar}
                    < CompanyNavbar />
                    <h5>Events</h5>
                    <br />
                    {/* <button style={{ float: 'right' }} className='btn btn-primary btn-xs' onClick={this.addEvent} >Post an Event</button> */}
                    <div className='row'>
                        <div className='col-4'>
                            {eventElement}
                            {errorElement}
                            <button style={this.state.pageNO === 1 ? { display: "none" } : null} onClick={this.previous}>Back</button>
                            <button style={{ marginLeft: "250px" }} onClick={this.next}>Next</button>
                        </div>
                        <div className='col-8'>
                            {eventOrForm}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        events: state.CompanyEvent.events
    }
}
export default connect(mapStateToProps, { companyGetEvents, companyPostEvent })(CompanyEvents);