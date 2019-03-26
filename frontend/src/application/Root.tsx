

import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Routes from '../routers';
import * as auth from '../actions/auth';
import WebSocketEvent from '../components/WebSocketEvent';

interface PropsType {

}

interface PropsTypeExtend {
    dispatch: CallableFunction
}

const mapProps = (state: any) => ({

});

class ORoot extends PureComponent<PropsTypeExtend, any> {

    componentDidMount() {
        this.props.dispatch(auth.session());
    }

    render() {
        return (
            <Fragment>
                <WebSocketEvent />
                <Routes />
            </Fragment>
        );
    }
}

const RootConnected = connect(mapProps)(ORoot);

const Root = (props: PropsType) => <RootConnected {...props} />;

export default Root;