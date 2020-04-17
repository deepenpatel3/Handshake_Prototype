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
                <div className='row'>
                    <div className='col-md-7'>
                        {this.state.skill}
                    </div>

                    <div style={{ float: "left" }} className='col-sm-2'>
                        <button onClick={this.handleDelete} className="btn"><i class="fa fa-trash" /></button>
                    </div>
                    <div className="col-sm-2">
                        <button style={{}} onClick={this.handleToggle} className="btn "><i class="fa fa-edit" /></button>
                    </div>
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
                        <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleToggle}>Cancel</button>
                        <button type="submit" style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-xs btn-outline-success waves-effect">Save</button>
                    </form>
                </div>
        }
        return (
            <div key={this.props.item}>

                {singleExp}
            </div>
        );
    }
}

export default connect(null, { studentUpdateSkill, studentDeleteSkill })(SingleSkill);
