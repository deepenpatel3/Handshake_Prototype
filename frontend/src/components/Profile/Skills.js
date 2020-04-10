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
                            required autoFocus />
                        <button className='btn btn-default btn-xs' onClick={this.handleToggle} type='submit'>Cancel</button>
                        <button className='btn btn-success btn-xs' onClick={this.handleSave}>Save</button>
                    </form>
                </div>
        }
        else {
            skillElement =
                <div>
                    <tr>
                        <td>
                            <div>{this.props.skills.map(single => <SingleSkill key={single} item={single} />)}</div>
                            <div>
                                <button style={{ marginTop: '20px' }} className="btn btn-primary"
                                    onClick={this.handleToggle}>Add Skill</button>
                            </div>
                        </td>
                    </tr>
                </div>
        }
        return (
            <div className='container'>
                <label>Skills</label>
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
