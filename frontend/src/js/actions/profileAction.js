import { STUDENT_GET_BASIC_DETAILS, STUDENT_UPDATE_BASIC_DETAILS, STUDENT_GET_CONTACT_INFO, STUDENT_UPDATE_CONTACT_INFO, STUDENT_SKILLS, STUDENT_CAREER_OBJECTIVE, STUDENT_EDUCATION_DETAILS, STUDENT_EXPERIENCE, COMPANY_BASIC_DETAILS, COMPANY_UPDATE_CONTACT, COMPANY_UPDATE_BASIC_DETAILS } from '../constants/action-types';
import cookie from "react-cookies";
import axios from 'axios';
const { backendURL } = require("../../Config");

export const studentGetBasicDetails = () => dispatch => {
    // console.log("insdie get basic details action")
    let data = {
        SID: cookie.load("SID")
    }
    axios({
        url: backendURL + '/student/profile/getBasicDetails',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_BASIC_DETAILS, payload: response.data.token });
        })
}

export const studentUpdateBasicDetails = (formData) => dispatch => {
    // console.log("inside update details action");
    axios({
        url: backendURL + '/student/profile/updateBasicDetails',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            // console.log("response", response);
            return dispatch({ type: STUDENT_UPDATE_BASIC_DETAILS, payload: response.data.token });
        })
}

export const studentGetContactInfo = () => dispatch => {
    // console.log("inside student get contact info")
    let data = {
        SID: cookie.load("SID")
    }
    axios({
        url: backendURL + '/student/profile/getContactInfo',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: STUDENT_GET_CONTACT_INFO, payload: response.data.token });
        })
}

export const studentUpdateContactInfo = (formData) => dispatch => {
    // console.log("inside student update contact info")
    axios({
        url: backendURL + '/student/profile/updateContactInfo',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            // console.log("student updated contact info", response.data);
            return dispatch({ type: STUDENT_UPDATE_CONTACT_INFO, payload: response.data.token });
        })
}

export const studentGetCareerObjective = () => dispatch => {
    // console.log("inside student get career objective action")
    let data = {
        SID: cookie.load("SID")
    }
    axios({
        url: backendURL + '/student/profile/getCareerObjective',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student updated contact info", response.data);
            return dispatch({ type: STUDENT_CAREER_OBJECTIVE, payload: response.data.token });
        })
}

export const studentUpdateCareerObjective = (formData) => dispatch => {
    console.log("inside student update career objective action")
    axios({
        url: backendURL + '/student/profile/updateCareerObjective',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            // console.log("student updated contact info", response.data);
            return dispatch({ type: STUDENT_CAREER_OBJECTIVE, payload: response.data.token });
        })
}

export const studentGetSkills = () => dispatch => {
    // console.log("inside student get skills action")
    let data = {
        SID: cookie.load("SID")
    }
    axios({
        url: backendURL + '/student/profile/getSkills',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student skills", response.data.token);
            return dispatch({ type: STUDENT_SKILLS, payload: response.data.token });
        })
}

export const studentAddSkill = (formData) => dispatch => {
    console.log("inside student add skill action")
    axios({
        url: backendURL + '/student/profile/addSkill',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            console.log("student updated contact info", response.data);
            return dispatch({ type: STUDENT_SKILLS, payload: response.data.token });
        })
}

export const studentUpdateSkill = (formData) => dispatch => {
    console.log("inside student update skill action")
    axios({
        url: backendURL + '/student/profile/updateSkill',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            // console.log("student updated contact info", response.data);
            return dispatch({ type: STUDENT_SKILLS, payload: response.data.token });
        })
}

export const studentDeleteSkill = (formData) => dispatch => {
    console.log("inside student delete skill action")
    axios({
        url: backendURL + '/student/profile/deleteSkill',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            // console.log("student updated contact info", response.data);
            return dispatch({ type: STUDENT_SKILLS, payload: response.data.token });
        })
}

export const studentGetEducationDetails = () => dispatch => {
    console.log("inside student get education action")
    let data = {
        SID: cookie.load("SID")
    }
    axios({
        url: backendURL + '/student/profile/getEducationDetails',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            // console.log("student skills", response.data.token);
            return dispatch({ type: STUDENT_EDUCATION_DETAILS, payload: response.data.token });
        })
}

export const studentAddEducationDetails = (formData) => dispatch => {
    console.log("inside student add education action")
    axios({
        url: backendURL + '/student/profile/addEducationDetails',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            console.log("student added education datails- ", response.data);
            return dispatch({ type: STUDENT_EDUCATION_DETAILS, payload: response.data.token });
        })
}

export const studentUpdateEducationDetails = (formData) => dispatch => {
    console.log("inside student update skill action")
    axios({
        url: backendURL + '/student/profile/updateEducationDetails',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            // console.log("student updated education details- ", response.data);
            return dispatch({ type: STUDENT_EDUCATION_DETAILS, payload: response.data.token });
        })
}

export const studentDeleteEducationDetails = (formData) => dispatch => {
    console.log("inside student delete education action")
    axios({
        url: backendURL + '/student/profile/deleteEducationDetails',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            console.log("student deleted education details- ", response.data);
            return dispatch({ type: STUDENT_EDUCATION_DETAILS, payload: response.data.token });
        })
}

export const studentGetExperience = () => dispatch => {
    // console.log("inside student get experience action")
    let data = {
        SID: cookie.load("SID")
    }
    axios({
        url: backendURL + '/student/profile/getExperience',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        params: data
    })
        .then(response => {
            console.log("student get experience details- ", response.data);
            return dispatch({ type: STUDENT_EXPERIENCE, payload: response.data.token });
        })
}

export const studentAddExperience = (formData) => dispatch => {
    console.log("inside student add experience action")
    axios({
        url: backendURL + '/student/profile/addExperience',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            console.log("student add experience details- ", response.data);
            return dispatch({ type: STUDENT_EXPERIENCE, payload: response.data.token });
        })
}

export const studentUpdateExperience = (formData) => dispatch => {
    console.log("inside student update experience action")
    axios({
        url: backendURL + '/student/profile/updateExperience',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            console.log("student update experience details- ", response.data);
            return dispatch({ type: STUDENT_EXPERIENCE, payload: response.data.token });
        })
}

export const studentDeleteExperience = (formData) => dispatch => {
    console.log("inside student delete experience action")
    axios({
        url: backendURL + '/student/profile/deleteExperience',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("token")
        },
        data: formData
    })
        .then(response => {
            console.log("student deleted experience details- ", response.data);
            return dispatch({ type: STUDENT_EXPERIENCE, payload: response.data.token });
        })
}

export const companyGetDetails = () => dispatch => {
    console.log("inside get details action")
    let data = {
        CID: cookie.load("CID")
    }
    axios({
        url: backendURL + '/company/profile/getBasicDetails',
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        params: data
    })
        .then(response => {
            // console.log("student basic details", response.data);
            return dispatch({ type: COMPANY_BASIC_DETAILS, payload: response.data.token });
        })
}

export const companyUpdateContactDetails = (formData) => dispatch => {
    console.log("inside student update contact action")
    axios({
        url: backendURL + '/company/profile/updateContactDetails',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        data: formData
    })
        .then(response => {
            console.log("company update contact details- ", response.data);
            return dispatch({ type: COMPANY_UPDATE_CONTACT, payload: response.data.token });
        })
}

export const companyUpdateBasicDetails = (formData) => dispatch => {
    console.log("inside student update basic details action")
    axios({
        url: backendURL + '/company/profile/updateBasicDetails',
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.load("companyToken")
        },
        data: formData
    })
        .then(response => {
            console.log("company update basic details details- ", response.data);
            return dispatch({ type: COMPANY_UPDATE_BASIC_DETAILS, payload: response.data.token });
        })
}