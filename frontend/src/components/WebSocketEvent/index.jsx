
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import * as config from '../../config';
import Websocket from 'react-websocket';

const mapProps = (state) => ({
    token: state.auth.token
});

class OWebSocketEvent extends PureComponent {

    state = {}

    componentDidMount() {

    }

    handleData = (message) => {
        const data = JSON.parse(message);
        this.props.dispatch(data);
    }

    render() {
        if (!this.props.token)
            return false;
        return (
            <Websocket
                url={`${config.server_ws}?token=${this.props.token}`}
                onMessage={this.handleData} />
        );
    }
}

const WebSocketEventConnected = connect(mapProps)(OWebSocketEvent);

const WebSocketEvent = (props) => <WebSocketEventConnected {...props} />;

export default WebSocketEvent;