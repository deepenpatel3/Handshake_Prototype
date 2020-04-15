import { STUDENT_GET_CHATS, STUDENT_GET_MESSAGES, STUDENT_SEND_MESSAGE } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    chats: [],
    messages: [],
    success: null
}

export default function studentMessageReducer(state = initialState, action) {
    switch (action.type) {
        case STUDENT_GET_MESSAGES:
            console.log("inside student get messages reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                messages: decoded.messages
            });
        case STUDENT_GET_CHATS:
            console.log("inside student get chats reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                chats: decoded.chats
            });
        case STUDENT_SEND_MESSAGE:
            console.log("inside student send message reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                success: decoded.success
            });
        default:
            return state;
    }
}