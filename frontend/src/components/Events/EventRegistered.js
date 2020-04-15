import React, { Component } from 'react';
import { connect } from "react-redux";
import { studentGetRegisteredEvents } from "../../js/actions/eventAction";
import cookie from "react-cookies";

class EventRegistered extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let data = { SID: cookie.load("SID") }
        this.props.studentGetRegisteredEvents(data);
    }
    render() {
        let registeredEventsElement = null, errorElement = null;
        if (this.props.registeredEvents.length > 0) {
            registeredEventsElement = this.props.registeredEvents.map(event => {
                return (
                    <tr>
                        <td style={{ textAlign: 'center' }}>
                            <h4>{event.name}</h4>
                            <p>By {event.company}</p>
                            <p>Time: {event.time}</p>
                            <p>Date: {event.date}</p>
                            <p>At {event.location}</p>
                            <p>Description: {event.description}</p>
                        </td>
                    </tr>
                )
            })
        } else {
            errorElement = <h3>No events Registered.</h3>
        }
        return (
            <div className="container">
                <table style={{ marginTop: '15px' }} className="table">
                    <tbody>
                        {registeredEventsElement}
                        {errorElement}
                    </tbody>
                </table>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        registeredEvents: state.StudentEvent.registeredEvents
    }
}
export default connect(mapStateToProps, { studentGetRegisteredEvents })(EventRegistered);