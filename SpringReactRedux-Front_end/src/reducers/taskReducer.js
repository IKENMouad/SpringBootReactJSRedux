import { GET_TASKS, DELETE_TASK, GET_TASK } from '../actions/types';

const initState = { tasks: [], task: null }

export default function (state = initState, action) {

    switch (action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload.id)
            };
        case GET_TASK:
            return {
                ...state,
                task: action.payload
            };

        default:
            return state
    }

}