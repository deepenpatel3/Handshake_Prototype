import { COMPANY_BASIC_DETAILS, COMPANY_UPDATE_CONTACT, COMPANY_UPDATE_BASIC_DETAILS } from '../constants/action-types';
const jwt_decode = require('jwt-decode')

const initialState = {
    companyName: "",
    email: "",
    location: "",
    phone: "",
    description: ""
}

export default function companyProfileReducer(state = initialState, action) {
    switch (action.type) {
        case COMPANY_BASIC_DETAILS:
            console.log("inside company get basic details reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                companyName: decoded.companyName,
                email: decoded.email,
                location: decoded.location,
                phone: decoded.phone,
                description: decoded.description
            });
        case COMPANY_UPDATE_CONTACT:
            console.log("inside COMPANY_UPDATE_CONTACT reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                email: decoded.email,
                phone: decoded.phone
            });
        case COMPANY_UPDATE_BASIC_DETAILS:
            console.log("inside company update basic details reducer");
            var decoded = jwt_decode(action.payload.split(' ')[1]);
            return Object.assign({}, state, {
                companyName: decoded.companyName,
                location: decoded.location,
                description: decoded.description
            });
        default:
            return state;
    }
}