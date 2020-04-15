import { STUDENT_LOG_IN, COMPANY_LOG_IN, STUDENT_SIGN_UP, COMPANY_SIGN_UP } from '../constants/action-types';

const initialState = {
    isStudentLoggedIn: null,
    isStudentSignedUp: null,
    isCompanyLoggedIn: null,
    isCompanySignedUp: null
}

export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case STUDENT_LOG_IN:
            // console.log("inside LOG_IN reducer")
            return Object.assign({}, state, {
                isStudentLoggedIn: action.payload
            });
        case COMPANY_LOG_IN:
            console.log('inside company login reducer')
            return Object.assign({}, state, {
                isCompanyLoggedIn: action.payload
            });
        case STUDENT_SIGN_UP:
            console.log('inside student signup reducer')
            return Object.assign({}, state, {
                isStudentSignedUp: action.payload
            });
        case COMPANY_SIGN_UP:
            console.log('inside company signup reducer')
            return Object.assign({}, state, {
                isCompanySignedUp: action.payload
            });
        default:
            return state;
    }
}