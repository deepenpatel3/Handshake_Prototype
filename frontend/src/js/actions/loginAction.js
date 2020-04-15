import { STUDENT_LOG_IN, COMPANY_LOG_IN, STUDENT_SIGN_UP, COMPANY_SIGN_UP } from '../constants/action-types';
import cookie from 'react-cookies';
const fetch = require('node-fetch');
const jwt_decode = require('jwt-decode');
const { backendURL } = require("../../Config");

export const studentLogin = (loginData) => dispatch => {
    fetch(backendURL + '/student/account/signIn', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())
        .then(response => {
            console.log("login resp0nse", response)
            var decoded = jwt_decode(response.token.split(' ')[1]);
            console.log("decoded", decoded)
            if (decoded.signInSuccess) {
                cookie.save("token", response.token);
                cookie.save("SID", decoded.SID);
                cookie.save("name", decoded.name);
            }
            return dispatch({ type: STUDENT_LOG_IN, payload: decoded.signInSuccess });
        })
}

export const companyLogin = (loginData) => dispatch => {
    console.log("inside company login action");
    fetch(backendURL + '/company/account/signIn', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => response.json())
        .then(response => {
            // console.log("login resp0nse", response)
            var decoded = jwt_decode(response.token.split(' ')[1]);
            // console.log("decoded", decoded)
            if (decoded.signInSuccess) {
                cookie.save("companyToken", response.token);
                cookie.save("CID", decoded.CID);
                cookie.save("company", decoded.companyName);
            }
            return dispatch({ type: COMPANY_LOG_IN, payload: decoded.signInSuccess });
        })
}

export const studentSignup = (Data) => dispatch => {
    fetch(backendURL + '/student/account/signUp', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
    })
        .then(response => response.json())
        .then(response => dispatch({ type: STUDENT_SIGN_UP, payload: response.signUpSuccess }))
}

export const companySignup = (Data) => dispatch => {
    fetch(backendURL + '/company/account/signUp', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Data)
    })
        .then(response => response.json())
        .then(response => dispatch({ type: COMPANY_SIGN_UP, payload: response.signUpSuccess }))
}