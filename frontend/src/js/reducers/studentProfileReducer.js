import { STUDENT_GET_BASIC_DETAILS, STUDENT_UPDATE_BASIC_DETAILS, STUDENT_GET_CONTACT_INFO, STUDENT_UPDATE_CONTACT_INFO, STUDENT_SKILLS, STUDENT_EDUCATION_DETAILS, STUDENT_CAREER_OBJECTIVE, STUDENT_EXPERIENCE } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    name: "",
    school: "",
    city: "",
    email: "",
    phone: "",
    careerObjective: "",
    skills: [],
    educationDetails: [],
    experienceDetails: []
}

export default function studentProfileReducer(state = initialState, action) {
    switch (action.type) {
        case STUDENT_GET_BASIC_DETAILS:
            // console.log("inside student get basic details reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                name: decoded.name,
                school: decoded.school,
                city: decoded.city
            });
        case STUDENT_UPDATE_BASIC_DETAILS:
            // console.log("inside student update basic details reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                name: decoded.name,
                school: decoded.school,
                city: decoded.city
            });
        case STUDENT_GET_CONTACT_INFO:
            // console.log("inside student get contact info reducer")
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            // console.log('contact info', decoded)
            return Object.assign({}, state, {
                email: decoded.email,
                phone: decoded.phone
            });
        case STUDENT_UPDATE_CONTACT_INFO:
            // console.log("inside student update contact info reducer")
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                email: decoded.email,
                phone: decoded.phone
            });
        case STUDENT_CAREER_OBJECTIVE:
            // console.log("inside student get career objective")
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                careerObjective: decoded.careerObjective
            });
        case STUDENT_SKILLS:
            // console.log("inside GET SKILLS reducer")
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                skills: decoded.skills
            });
        case STUDENT_EDUCATION_DETAILS:
            // console.log("inside GET EDUCATION reducer")
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            // console.log("updates education:--", decoded)
            return Object.assign({}, state, {
                educationDetails: decoded.educationDetails
            });
        case STUDENT_EXPERIENCE:
            // console.log("inside STUDENT EXPERIENCE reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                experienceDetails: decoded.experienceDetails
            });
        default:
            return state;
    }
}