import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from './reducers';


const initialeState = {}
const middelware = [thunk]

const store = createStore(
    rootReducers,
    initialeState,
    compose(
        applyMiddleware(...middelware)
    )
);

export default store;