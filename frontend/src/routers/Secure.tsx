

import React, { PureComponent } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../screens/Login';
import { StateProps } from "../reducers/auth";

interface PropsType {

    /**
     * 
     */
    path: string

    /**
     * 
     */
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>

    /**
     * 
     */
    exact?: boolean
}

interface PropsTypeExtend extends PropsType {

    /**
     * Contiene informacion de la session de usuario
     */
    auth: StateProps
}

const mapProps = (state: any) => ({
    auth: state.auth
});

class OSecure extends PureComponent<PropsTypeExtend> {
    static defaultProps = {
        exact: false
    }
    render() {
        if (this.props.auth.token === '') {
            return <Login />
        }
        return (
            <Route
                exact={this.props.exact}
                path={this.props.path}
                component={this.props.component} />
        );
    }
}

const SecureConnect = connect(mapProps)(OSecure);

/**
 * Sirve para validar si realmente se ha iniciado session
 */
const Secure = (props: PropsType): JSX.Element => <SecureConnect {...props} />;

export default Secure;