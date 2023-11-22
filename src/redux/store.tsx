import {applyMiddleware, compose, createStore} from 'redux';
import RootReducer from './combine.reducer';

const store = createStore(RootReducer);

export {store};
