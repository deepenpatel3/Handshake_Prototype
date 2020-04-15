import { STUDENT_GET_EVENTS, STUDENT_GET_REGISTERED_EVENTS } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    events: [],
    registeredEvents: []
}

export default function studentEventReducer(state = initialState, action) {
    switch (action.type) {
        case STUDENT_GET_EVENTS:
            console.log("inside student get events reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                events: decoded.events
            });
        case STUDENT_GET_REGISTERED_EVENTS:
            console.log("inside student get registered reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                registeredEvents: decoded.events
            });
        default:
            return state;
    }
}