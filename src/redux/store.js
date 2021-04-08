import { applyMiddleware, createStore } from 'redux';
//import logger from 'redux-logger';
import rootReducer from './root-reducer';

import reduxThunk from 'redux-thunk';
import {proyectName} from "../configuracion/constantes"
function saveToLocalStorage(store) {
    try {
        //console.log('saveLocalStorage');
        //console.log(store);
        const serializedState = JSON.stringify(store);
        localStorage.setItem(proyectName, serializedState);
    } catch (e) {
        console.log(e);
    }
}
function loadFromLocalStorage() {
    try {
        //console.log('loadLocalStorage');
        const serializedState = localStorage.getItem(proyectName);
        //console.log(serializedState);
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

//const middlewares = [logger];
//const store = createStore(rootReducer,applyMiddleware(...middlewares))

const store = createStore(rootReducer, loadFromLocalStorage(), applyMiddleware(reduxThunk));
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;