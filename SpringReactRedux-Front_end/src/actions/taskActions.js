import axios from 'axios';
import { GET_ERRORS, GET_TASKS, DELETE_TASK, GET_TASK } from './types';


export const addTaskAction = (task, history) => async dispatch => {
    try {
        await axios.post('http://localhost:8080/api/tasks/', task);
        history.push('/');
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}

export const getTasksAction = () => async dispatch => {
    const res = await axios.get('http://localhost:8080/api/tasks/');
    dispatch({
        type: GET_TASKS,
        payload: res.data
    })
}

export const deleteTasksAction = (id) => async dispatch => {
    const res = await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    dispatch({
        type: DELETE_TASK,
        payload: {
            id: id,
            data: res.data
        }
    })
}

export const getTaskAction = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:8080/api/tasks/${id}`);
        dispatch({
            type: GET_TASK,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error
        })
    }
}