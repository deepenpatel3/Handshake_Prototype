import React, { Component } from 'react';
import { connect } from "react-redux";
// import { companyGetEvents, companyPostEvent } from '../../js/actions/eventAction';
import cookie from "react-cookies";
import { Link, Redirect } from "react-router-dom";
import { studentGetMessages, studentSendMessage } from "../../js/actions/messageAction";

class ChatHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            success: this.props.success,
            user2Name: this.props.location.state.name,
            backPath: this.props.location.state.path,
            user2: this.props.location.state._id
        }
        this.getMessages = this.getMessages.bind(this);
        this.send = this.send.bind(this);
    }
    componentDidMount() {
        this.getMessages();
    }
    // componentDidUpdate(prevProps, nextState) {
    //     if(prevProps.success)
    // }
    getMessages = () => {
        console.log("inside get messages");
        let data = {
            user1: cookie.load("SID") ? cookie.load("SID") : cookie.load("CID"),
            user2: this.state.user2
        }
        this.setState({ success: false }, () => { this.props.studentGetMessages(data); })
    }
    send = (e) => {
        e.preventDefault();
        let data = {
            user1: cookie.load("SID") ? cookie.load("SID") : cookie.load("CID"),
            user2: this.state.user2,
            message: document.getElementById("message").value,
            sender: cookie.load("name") ? cookie.load("name") : cookie.load("company"),
            receiver: this.state.user2Name
        }
        this.props.studentSendMessage(data);
    }
    render() {
        let redirectVar = null, messageElement = null;
        // console.log("this.state.success---", this.state.success)
        console.log("user2- ", this.state.user2, " user2Name- ", this.state.user2Name)
        if (this.state.success) {
            this.getMessages();
        }
        // console.log(" backpath--", this.state.backPath, "user2 id--", this.state.user2)
        if (!cookie.load("SID")) {
            if (!cookie.load("CID"))
                redirectVar = <Redirect to="/" />
        }

        if (this.props.messages.length > 0) {
            messageElement = this.props.messages.map(message => {
                return (
                    <h3>{message.sender}: {message.message}</h3>
                )
            })
        }
        return (
            <div className='container'>
                <Link style={{ position: "absolute", top: "20px" }} to={this.state.backPath}>Back</Link>
                {redirectVar}
                <div style={{ marginTop: "50px" }} className="container">
                    {messageElement}
                    <form className="form-inline" >
                        <div className="form-group"><input type="text" id="message" className="form-control" style={{ position: "fixed", bottom: "10px", height: "40px", width: "50%", border: "2px solid black" }}></input></div>
                        <div className="form-group"><button className="form-control" style={{ position: "fixed", bottom: "10px", right: "33%" }} type="submit" className="btn btn-primary btn-lg" onClick={this.send}>Send</button></div>
                    </form>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        messages: state.StudentMessage.messages,
        success: state.StudentMessage.success
    }
}
export default connect(mapStateToProps, { studentGetMessages, studentSendMessage })(ChatHistory);




