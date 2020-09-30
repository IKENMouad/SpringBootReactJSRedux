import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import taskReducer from './taskReducer';

export default combineReducers({
    errors: errorReducer,
    task: taskReducer
})