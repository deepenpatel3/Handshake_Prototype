import React, { Component } from 'react';
import CompanyNavbar from '../Navbar/companyNavbar';
import { studentGetStudents } from '../../js/actions/studentAction';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cookie from 'react-cookies';

class CompanyStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNO: 1,
            nameOrSchoolOrskill: ""
        }
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        this.getStudents();
    }
    getStudents = () => {
        let data = {
            ID: cookie.load("CID"),
            pageNO: this.state.pageNO,
            nameOrSchool: this.state.nameOrSchoolOrskill
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
        this.setState({ nameOrSchoolOrskill: e.target.value }, () => { this.getStudents() })
    }
    render() {
        var studentsElement = null;
        if (this.props.students.length > 0) {
            studentsElement = this.props.students.map(student => {
                return (
                    <tr>
                        <td >
                            <ul style={{ textAlign: "center" }} className="list-group">
                                <li className="list-group-item">
                                    <Link to={{
                                        pathname: "/otherStudent",
                                        state: {
                                            student: student, path: '/companyStudents'
                                        }
                                    }} style={{ color: 'black' }}>{student.name}</Link></li>
                                <li className="list-group-item">{student.school}</li>
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
                < CompanyNavbar />
                <h5>Explore Students</h5>
                <div className='row'>
                    <div className='col'>
                        <div style={{ marginTop: '15px', marginBottom: '15px' }} class="form-inline">
                            <input style={{ width: '100%' }} type="text" onChange={this.handleSearch} class="form-control" placeholder="Search students by name or school or skill" />
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <table className='table'>
                        <tbody>
                            {studentsElement}
                        </tbody>
                        <button style={this.state.pageNO === 1 ? { display: "none" } : null} onClick={this.previous}>Back</button>
                        <button style={{ marginLeft: "1100px" }} onClick={this.next}>Next</button>
                    </table>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        students: state.Student.students
    }
}
export default connect(mapStateToProps, { studentGetStudents })(CompanyStudents);