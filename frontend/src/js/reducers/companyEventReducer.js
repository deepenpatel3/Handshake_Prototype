import { COMPANY_GET_EVENTS } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    events: []
}

export default function companyEventReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_GET_EVENTS:
            console.log("inside company get events reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                events: decoded.events
            });

        default:
            return state;
    }
}