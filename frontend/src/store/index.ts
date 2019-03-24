

import { createStore, applyMiddleware, Store } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const defaultState = JSON.parse(sessionStorage.getItem('session') || '{}');

const store: Store = createStore(reducers, defaultState, applyMiddleware(thunk));

window.onbeforeunload = function() {
    sessionStorage.setItem('session', JSON.stringify(store.getState()));
};

export default store;