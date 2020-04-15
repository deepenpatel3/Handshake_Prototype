import { STUDENT_GET_STUDENTS } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    students: []
}

export default function studentReducer(state = initialState, action) {
    switch (action.type) {
        case STUDENT_GET_STUDENTS:
            console.log("inside student get students reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                students: decoded.students
            });

        default:
            return state;
    }
}