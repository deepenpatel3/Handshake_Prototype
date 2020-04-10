import React, { Component } from 'react';
import cookie from "react-cookies";
import { connect } from "react-redux";
import { studentUpdateSkill, studentDeleteSkill } from '../../js/actions/profileAction';

class SingleSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: this.props.item,
            editFlag: false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete = (e) => {
        let data = {
            SID: cookie.load("SID"),
            skill: this.state.skill
        }
        this.props.studentDeleteSkill(data);
    }
    handleToggle = () => {
        if (!this.state.editFlag) {
            this.setState({
                editFlag: true
            })
        } else {
            this.setState({
                editFlag: false
            })
        }
    }
    handleSave = async (e) => {
	e.preventDefault();        
	let data = {
            SID: cookie.load("SID"),
            skill: this.state.skill,
            updatedSkill: document.getElementById("skill").value
        }
        await this.props.studentUpdateSkill(data);
	this.setState({
		editFlag: false
	})
    }
    render() {
        let singleExp = null;
        // console.log('skill- ', this.state.skill)
        if (this.state.editFlag === false) {
            singleExp =
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>{this.state.skill}</td>
                                <td align="right">
                                    <button onClick={this.handleToggle} className="btn btn-primary btn-xs">Edit</button>
                                    <button onClick={this.handleDelete} className="btn btn-danger btn-xs">Delete</button>
                                </td>
                            </tr>
                            <br />
                        </tbody>
                    </table>
                </div>
        } else {
            singleExp =
                <div>
                    <form className="container" onSubmit={this.handleSave}>
                        <input
                            type="text"
                            id="skill"
                            name="skill"
                            placeholder="Enter your skill"
                            required
                            autoFocus />
                        <br />
                        <button style={{ marginTop: '20px' }} className="btn btn-danger btn-xs" onClick={this.handleToggle}>Cancel</button>
                        <button type="submit" style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-success btn-xs">Save</button>
                    </form>
                </div>
        }
        return (
            <div>
                <div key={this.props.item}>

                    {singleExp}
                </div>
            </div>
        );
    }
}

export default connect(null, { studentUpdateSkill, studentDeleteSkill })(SingleSkill);
