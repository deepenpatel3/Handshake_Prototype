import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import studentProfileReducer from './studentProfileReducer';
import companyProfileReducer from './companyProfileReducer';
import companyJobReducer from './companyJobReducer';
import studentJobReducer from "./studentJobReducer";
import companyEventReducer from "./companyEventReducer";
import studentEventReducer from "./studentEventReducer";
import studentReducer from "./studentReducer";
import studentMessageReducer from "./studentMessageReducer";

const rootReducer = combineReducers({
    Login: loginReducer,
    StudentProfile: studentProfileReducer,
    CompanyProfile: companyProfileReducer,
    CompanyJob: companyJobReducer,
    StudentJob: studentJobReducer,
    CompanyEvent: companyEventReducer,
    StudentEvent: studentEventReducer,
    Student: studentReducer,
    StudentMessage: studentMessageReducer
})

export default rootReducer;


