import { COMPANY_GET_EVENTS, STUDENT_GET_EVENTS, STUDENT_GET_REGISTERED_EVENTS } from '../constants/action-types';
import cookie from "react-cookies";
import axios from 'axios';
const { backendURL } = require("../../Config");

export const companyGetEvents = (data) => dispatch => {
    console.log("insdie get company events action")
    axios({
        url: backendURL + '/company/events/getEvents',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: COMPANY_GET_EVENTS, payload: response.data.token });
        })
}

export const companyPostEvent = (formData) => dispatch => {
    console.log("inside post event action");
    axios({
        url: backendURL + '/company/events/postEvent',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        data: formData
    })
    // .then(response => {
    //     console.log("response", response);
    //     return dispatch({ type: COMPANY_POST_JOB, payload: response.data.token });
    // })
}

export const studentGetEvents = (data) => dispatch => {
    console.log("inside get student events action");
    axios({
        url: backendURL + '/student/events/getEvents',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_EVENTS, payload: response.data.token });
        })
}

export const studentGetRegisteredEvents = (data) => dispatch => {
    console.log("inside get student registered events action");
    axios({
        url: backendURL + '/student/events/getRegisteredEvents',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    }).then(response => {
        // console.log("student basic details", response.data);
        return dispatch({ type: STUDENT_GET_REGISTERED_EVENTS, payload: response.data.token });
    })
}

export const studentRegisterEvent = (formData) => dispatch => {
    console.log("inside register event action");
    axios({
        url: backendURL + '/student/events/registerEvent',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
}