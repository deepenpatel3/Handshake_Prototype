import { STUDENT_GET_JOBS, STUDENT_GET_APPLIED_JOBS } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    jobs: [],
    appliedJobs: []
}

export default function studentJobReducer(state = initialState, action) {
    switch (action.type) {
        case STUDENT_GET_JOBS:
            console.log("inside student get jobs reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                jobs: decoded.jobs
            });
        case STUDENT_GET_APPLIED_JOBS:
            console.log("inside student get applied jobs reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                appliedJobs: decoded.jobs
            });
        default:
            return state;
    }
}