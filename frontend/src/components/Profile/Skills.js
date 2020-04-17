import React, { Component } from 'react';
import SingleSkill from './singleSkill';
import { connect } from "react-redux";
import { studentGetSkills, studentAddSkill } from "../../js/actions/profileAction";
import cookie from "react-cookies";

class Skills extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFlag: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        this.props.studentGetSkills();
    }

    handleToggle = () => {
        if (this.state.addFlag === true) {
            this.setState({
                addFlag: false
            })

        } else {
            this.setState({
                addFlag: true
            })
        }
    }
    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            SID: cookie.load("SID"),
            skill: document.getElementById("skill").value
        }
        await this.props.studentAddSkill(data);
        this.setState({
            addFlag: false
        })
    }
    render() {
        let skillElement = null;
        if (this.state.addFlag === true) {
            skillElement =
                <div>
                    <form className='container' >
                        <input
                            type='text' id='skill' name='skill' placeholder='Enter your skill'
                            required autoFocus /><br /><br />
                        <button className='btn btn-xs btn-outline-danger waves-effect' onClick={this.handleToggle} type='submit'>Cancel</button>
                        <button style={{ marginLeft: "20px" }} className='btn btn-xs btn-outline-success waves-effect' onClick={this.handleSave}>Save</button>
                    </form>
                </div>
        }
        else {
            skillElement =
                <div>
                    <tr>
                        <td>
                            <div>{this.props.skills.map(single => <SingleSkill key={single} item={single} />)}</div>
                        </td>
                    </tr>
                </div>
        }
        return (
            <div className='container'>
                <label>Skills</label>
                <button style={{ marginLeft: '235px', borderRadius: "30%" }} className="btn btn-secondary" onClick={this.handleToggle}>+</button>
                <table className="table table-borderless">
                    <tbody>
                        {skillElement}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        skills: state.StudentProfile.skills
    }
}
export default connect(mapStateToProps, { studentGetSkills, studentAddSkill })(Skills);
