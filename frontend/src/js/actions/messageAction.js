import { STUDENT_GET_MESSAGES, STUDENT_GET_CHATS, STUDENT_SEND_MESSAGE } from '../constants/action-types';
import cookie from "react-cookies";
import axios from 'axios';
const { backendURL } = require("../../Config");

export const studentGetMessages = (data) => dispatch => {
    // console.log("insdie get student get msgs action")
    axios({
        url: backendURL + '/student/message/getMessages',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_MESSAGES, payload: response.data.token });
        })
}

export const studentSendMessage = (data) => dispatch => {
    console.log("insdie student post msg action")
    axios({
        url: backendURL + '/student/message/sendMessage',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_SEND_MESSAGE, payload: response.data.token });
        })
}

export const studentGetChats = (data) => dispatch => {
    console.log("insdie student get chats action")
    axios({
        url: backendURL + '/student/message/getChats',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_CHATS, payload: response.data.token });
        })
}