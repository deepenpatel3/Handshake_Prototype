import { STUDENT_GET_STUDENTS } from '../constants/action-types';
import cookie from "react-cookies";
import axios from 'axios';
const { backendURL } = require("../../Config");

export const studentGetStudents = (data) => dispatch => {
    console.log("insdie get student get students action")
    axios({
        url: backendURL + '/student/students/getStudents',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_STUDENTS, payload: response.data.token });
        })
}