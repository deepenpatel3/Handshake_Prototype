import { COMPANY_GET_JOBS, COMPANY_POST_JOB, STUDENT_GET_JOBS, STUDENT_GET_APPLIED_JOBS, COMPANY_CHANGE_STATUS } from '../constants/action-types';
import cookie from "react-cookies";
import axios from 'axios';
const { backendURL } = require("../../Config");

export const companyGetJobs = (data) => dispatch => {
    console.log("insdie get company jobs action")
    axios({
        url: backendURL + '/company/jobs/getJobs',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: COMPANY_GET_JOBS, payload: response.data.token });
        })
}

export const companyPostJob = (formData) => dispatch => {
    console.log("inside post job action");
    axios({
        url: backendURL + '/company/jobs/postJob',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        data: formData
    })
        .then(response => {
            // console.log("response", response);
            return dispatch({ type: COMPANY_POST_JOB, payload: response.data.token });
        })
}

export const studentGetJobs = (data) => dispatch => {
    console.log("inside get student jobs action");
    axios({
        url: backendURL + '/student/jobs/getJobs',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_JOBS, payload: response.data.token });
        })
}

export const studentGetAppliedJobs = (data) => dispatch => {
    console.log("inside get student applied jobs action");
    axios({
        url: backendURL + '/student/jobs/getAppliedJobs',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_APPLIED_JOBS, payload: response.data.token });
        })
}

export const companyChangeAppStatus = (formData) => dispatch => {
    console.log("inside company change app status action");
    axios({
        url: backendURL + '/company/jobs/changeStatus',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        data: formData
    }).then(response => {
        // console.log("student basic details", response.data);
        return dispatch({ type: COMPANY_CHANGE_STATUS, payload: response });
    })

}