import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import weatherReducer from './weatherReducer';
import commonReducer from './commonReducer';
import mapsReducer from './mapsReducer';
import currencyExchangeReducer from './currencyExchangeReducer';

import thunkMiddleware from "redux-thunk";



let reducers = combineReducers({
    common: commonReducer,
    weather: weatherReducer,
    maps: mapsReducer,
    currencyExchange: currencyExchangeReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.__store__ = store;

export default store;

