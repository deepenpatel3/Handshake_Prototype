import { COMPANY_GET_JOBS } from '../constants/action-types';
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

        default:
            return state;
    }
}