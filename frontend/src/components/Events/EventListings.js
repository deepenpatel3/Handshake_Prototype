import React, { Component } from 'react';
import { connect } from "react-redux";
import cookie from "react-cookies";
import { studentGetEvents, studentRegisterEvent } from "../../js/actions/eventAction";

class EventsListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            name: "",
            firstEvent: {},
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.showEvent = this.showEvent.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount() {
        this.getEvents();
    }
    componentDidUpdate(prevProps) {
        if (prevProps.events !== this.props.events) {
            if (this.props.events.length > 0) {
                this.setState({ firstEvent: this.props.events[0] })
            }
            else {
                this.setState({ firstEvent: {} })
            }
        }
    }
    getEvents = () => {
        let data = {
            pageNO: this.state.pageNO,
            name: this.state.name
        }
        this.props.studentGetEvents(data);
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
    showEvent = (event) => {
        this.setState({
            firstEvent: event
        })
    }
    handleRegister = () => {
        let data = {
            ID: this.state.firstEvent._id,
            SID: cookie.load("SID")
        }
        this.props.studentRegisterEvent(data);
        this.forceUpdate();
    }
    handleSearch = (e) => {
        this.setState({
            name: e.target.value
        }, () => { this.getEvents() })
    }
    render() {
        console.log("first event--", this.state.firstEvent)
        var eventelement = null, eventDetails = null, errorElememt = null;
        if (this.props.events.length > 0) {
            eventelement = this.props.events.map(event => {
                return (
                    <div className="container">
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        <button id={event.ID} onClick={() => this.showEvent(event)} className="btn">
                                            <ul style={{ textAlign: 'left' }}>
                                                <li>{event.name}</li>
                                                <li>{event.date}</li>
                                            </ul>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })

            eventDetails =
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h1>{this.state.firstEvent.name}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>by {this.state.firstEvent.companyName}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>at {this.state.firstEvent.location}</p>
                        </div>
                        <div className="col">
                            <p>on: {new Date(this.state.firstEvent.date).getMonth() + 1}-{new Date(this.state.firstEvent.date).getDate()}-{new Date(this.state.firstEvent.date).getFullYear()}</p>
                        </div>
                        <div className="col">
                            <p>Time: {this.state.firstEvent.time}</p>
                        </div>
                        <div className="col">
                            <p>Eligibility: {this.state.firstEvent.eligibility}</p>
                        </div>
                        <div className="col">
                            {this.state.firstEvent.eligibility === 'Software' || this.state.firstEvent.eligibility === 'all' ? <button className="btn btn-primary btn-xs" id="register" onClick={this.handleRegister}>Register</button> : <button className="btn btn-primary btn-xs" id="register" onClick={this.handleRegister} disabled>Register</button>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <p>Event Description:  {this.state.firstEvent.description}</p>
                        </div>
                    </div>

                </div>
        }
        else {
            errorElememt = <h3>No Events found</h3>
        }
        return (
            <div className='container'>
                <div style={{ marginTop: '15px', marginBottom: '15px' }} class="form-inline">
                    <input style={{ width: '100%' }} type="text" onChange={this.handleSearch} class="form-control" placeholder="Search events by name..." />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            {eventelement}
                            {errorElememt}
                            <button style={this.state.pageNO === 1 ? { display: "none" } : null} onClick={this.previous}>Back</button>
                            <button style={this.props.events.length > 0 ? { marginLeft: "250px" } : { display: "none" }} onClick={this.next}>Next</button>
                        </div>
                        <div className="col">
                            {eventDetails}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        events: state.StudentEvent.events
    }
}
export default connect(mapStateToProps, { studentGetEvents, studentRegisterEvent })(EventsListings);