

import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const defaultState = JSON.parse(sessionStorage.getItem('session') || '{}');

const store: Store = createStore(
    reducers, 
    defaultState, 
    composeWithDevTools(applyMiddleware(thunk))
);

window.onbeforeunload = function() {
    sessionStorage.setItem('session', JSON.stringify(store.getState()));
};

export default store;