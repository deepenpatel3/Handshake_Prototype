import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { connect } from "react-redux";
import { studentGetChats } from "../../js/actions/messageAction";
import cookie from "react-cookies";
import { Link, Redirect } from "react-router-dom";

class CompanyMessages extends Component {
    constructor(props) {
        super(props)
        this.state = {


        }
        this.getChats = this.getChats.bind(this);

    }
    componentDidMount() {
        this.getChats();
    }
    // componentDidUpdate(prevProps, nextState) {

    // }
    getChats = () => {
        let data = {
            ID: cookie.load("CID")
        }
        this.props.studentGetChats(data);
    }
    render() {
        let redirectVar = null, chatElement = null;
        if (!cookie.load("CID"))
            redirectVar = <Redirect to="/companySignIn" />
        if (this.props.chats.length > 0) {
            chatElement = this.props.chats.map(chat => {
                return (
                    <tr>
                        <td >
                            <ul className="list-group">
                                <li className="list-group-item"><Link to={{
                                    pathname: "/chatHistory",
                                    state: {
                                        name: chat.names[0] === cookie.load("company") ? chat.names[1] : chat.names[0],
                                        _id: chat.users[0] === cookie.load("CID") ? chat.users[1] : chat.users[0],
                                        path: cookie.load("SID") ? '/messages' : '/companyMessages'
                                    }
                                }} style={{ color: 'black' }}>{chat.names[0] === cookie.load("company") ? chat.names[1] : chat.names[0]}</Link></li>
                            </ul>
                        </td>
                    </tr>
                )
            })
        }
        return (
            <div className='container'>
                <CompanyNavbar />
                {redirectVar}
                <div className="container">
                    <h2>Chats</h2>
                    <table className="table">

                        <tbody>
                            {chatElement}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        chats: state.StudentMessage.chats
    }
}
export default connect(mapStateToProps, { studentGetChats })(CompanyMessages);




