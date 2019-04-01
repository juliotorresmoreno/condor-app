

import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const defaultState = JSON.parse(sessionStorage.getItem('session') || '{}');

interface StoreExtend extends Store {
    createStore: (state: any) => Store
}

const createStoreExtend = (defaultState: any): StoreExtend => {
    const tmp: any = createStore(
        reducers,
        defaultState,
        composeWithDevTools(applyMiddleware(thunk))
    );
    tmp.createStore = () => {

    }
    return tmp as StoreExtend;
}

const store: StoreExtend = createStoreExtend(defaultState);

window.onbeforeunload = function () {
    sessionStorage.setItem('session', JSON.stringify(store.getState()));
};

export default store;