import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import { connect } from "react-redux";
import cookie from "react-cookies";
import { studentGetStudents } from "../../js/actions/studentAction";
import { Link, Redirect } from "react-router-dom";

class OtherStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            nameOrSchool: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
        this.getStudents = this.getStudents.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }
    componentDidMount() {
        this.getStudents();
    }
    getStudents = () => {
        let data = {
            ID: cookie.load("SID"),
            pageNO: this.state.pageNO,
            nameOrSchool: this.state.nameOrSchool
        }
        this.props.studentGetStudents(data);
    }
    next = () => {
        this.setState({
            pageNO: this.state.pageNO + 1
        }, () => this.getStudents())
    }
    previous = () => {
        this.setState({
            pageNO: this.state.pageNO - 1
        }, () => this.getStudents())
    }
    handleSearch = (e) => {
        this.setState({ nameOrSchool: e.target.value }, () => this.getStudents())
    }
    render() {

        // console.log('clicked student', this.state.clickedStudent);
        var studentsElement = null, redirectVar = null;
        if (!cookie.load("SID")) redirectVar = <Redirect to="/studentSignIn" />
        if (this.props.students.length > 0) {
            studentsElement = this.props.students.map(student => {
                return (
                    <tr>
                        <td >
                            <ul style={{ textAlign: "center" }} className="list-group">
                                <li className="list-group-item"><Link to={{
                                    pathname: "/otherStudent",
                                    state: {
                                        student: student,
                                        path: '/students'
                                    }
                                }} style={{ color: 'black' }}>{student.name}</Link></li>
                                <li className="list-group-item">{student.school}</li>
                                <li className="list-group-item">Graduation Year:{student.passingYear}</li>
                            </ul>
                        </td>
                    </tr>
                )
            })
        } else {
            studentsElement = <h3>No Students found</h3>
        }

        return (
            <div className='container'>
                {redirectVar}
                <Navbar />
                <input type="text" style={{ width: "100%" }} onChange={this.handleSearch} placeholder="Explore Students by Name or College"></input>
                <table style={{ marginTop: '15px' }} className="table">
                    <tbody>
                        {studentsElement}
                    </tbody>
                    <button style={this.state.pageNO === 1 ? { display: "none" } : null} onClick={this.previous}>Back</button>
                    <button style={{ marginLeft: "250px" }} onClick={this.next}>Next</button>
                </table>

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        students: state.Student.students
    }
}
export default connect(mapStateToProps, { studentGetStudents })(OtherStudents);

