import React, { Component } from 'react';
import { connect } from "react-redux";
import cookie from "react-cookies";
import { studentGetCareerObjective, studentUpdateCareerObjective } from "../../js/actions/profileAction";

class CareerObjective extends Component {
    constructor(props) {
        super(props);
        this.state = {
            careerObjective: '',
            editFlag: false
        }
        this.handleCancel = this.handleCancel.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        this.props.studentGetCareerObjective();
    }
    handleEdit = () => {
        this.setState({
            editFlag: true
        })
    }
    handleCancel = () => {
        this.setState({
            editFlag: false
        })
    }
    handleSave = async (e) => {
        e.preventDefault();
        let data = {
            SID: cookie.load("SID"),
            careerObjective: document.getElementById("careerObjective").value
        }
        await this.props.studentUpdateCareerObjective(data);
        this.setState({
            editFlag: false
        })
    }
    render() {
        let infoOrForm = null;


        if (this.state.editFlag === false) {
            infoOrForm = <p style={{ border: "0" }} className="list-group-item">{this.props.careerObjective}</p>
        }
        else {
            infoOrForm =
                <form className="container">
                    <textarea
                        style={{ width: '400px' }}
                        // type="textarea"
                        id="careerObjective"
                        name="careerObjective"
                        required
                        autoFocus />
                    <br />
                    <button style={{ marginTop: '20px' }} className="btn btn-xs btn-outline-danger waves-effect" onClick={this.handleCancel}>Cancel</button>
                    <button style={{ marginTop: '20px', marginLeft: '20px' }} className="btn btn-outline-success waves-effect" onClick={this.handleSave}>Save</button>
                </form>
        }
        return (

            <div className="container, card-body">
                <label >Career Objective</label>
                <button style={{ marginLeft: "545px" }} onClick={this.handleEdit} className="btn btn-lg"><i class="fa fa-edit" /></button>

                {infoOrForm}

            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        careerObjective: state.StudentProfile.careerObjective
    }
}
export default connect(mapStateToProps, { studentGetCareerObjective, studentUpdateCareerObjective })(CareerObjective);
