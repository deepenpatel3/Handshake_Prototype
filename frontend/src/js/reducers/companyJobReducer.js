import { COMPANY_GET_JOBS, COMPANY_POST_JOB, COMPANY_CHANGE_STATUS } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    jobs: []
}

export default function companyJobReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_GET_JOBS:
            console.log("inside company get jobs reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                jobs: decoded.jobs
            });
        case COMPANY_POST_JOB:
            // console.log("inside company get jobs reducer");
            return state;
        case COMPANY_CHANGE_STATUS:
            // console.log("inside company get jobs reducer");
            return state;
        default:
            return state;
    }
}