
import React, { PureComponent, Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store';
import Root from './Root';

interface PropsType {

}

class Application extends PureComponent<PropsType> {

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <Provider store={store}>
                        <Root />
                    </Provider>
                </BrowserRouter>
            </Fragment >
        );
    }
}

export default Application;
