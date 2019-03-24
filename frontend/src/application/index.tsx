
import React, { PureComponent, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from '../routers';
import store from '../store';

interface PropsType {

}

class Application extends PureComponent<PropsType> {
    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Provider store={store}>
                        <Routes />
                    </Provider>
                </BrowserRouter>
            </Fragment >
        );
    }
}

export default Application;
