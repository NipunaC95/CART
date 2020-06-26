import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
 
//const middleWare = [thunk, logger];
const middleWare = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middleWare));

export default store;
