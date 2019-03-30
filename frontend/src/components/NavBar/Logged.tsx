import React, { PureComponent, Fragment } from 'react';
import {
    Navbar,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import l18n from '../../l18n';
import * as auth from '../../actions/auth';
import { connect } from 'react-redux';
import { IPromise } from 'q';
import DialogProfile from '../Dialog/DialogProfile';

interface PropTypes {

}

interface PropTypesExtend extends PropTypes {

    /**
     * 
     */
    auth: {

        /**
         * 
         */
        name: string

        /**
         * 
         */
        lastname: string
    }

    /**
     * 
     */
    dispatch: (action: CallableFunction | any) => void
}

interface StateProps {
    isOpen: boolean
}

const mapProps = (state: any) => ({
    auth: state.auth
});

/**
 *  NavBar que se debe mostrar cuando el usuario no ha iniciado session
 */
class OLogged extends PureComponent<PropTypesExtend, any> {

    state: StateProps = {
        isOpen: false
    }

    handleLogout = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evt.preventDefault();
        this.props.dispatch(auth.logout());
    }

    handleProfile = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evt.preventDefault();
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Fragment>
                <DialogProfile
                    isOpen={this.state.isOpen} />

                <Navbar color="light" light dark expand="md">
                    <Link className="navbar-brand" to="/" onClick={this.handleProfile}>
                        <i className="fas fa-home"></i>
                        &nbsp;
                        {`${this.props.auth.name} ${this.props.auth.lastname}`}
                    </Link>

                    <Nav className="ml-auto" navbar>
                        <NavItem className="align-middle">
                            <Link onClick={this.handleLogout} className="nav-link" to="/logout">
                                <i className="fas fa-sign-out-alt"></i>
                                &nbsp;
                                {l18n.logoutLink}
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </Fragment>
        );
    }
}

const LoggedConnect = connect(mapProps)(OLogged);

const Logged = (props: PropTypes): JSX.Element => <LoggedConnect {...props} />

export default Logged;