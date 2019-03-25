import React, { PureComponent, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import l18n from '../../l18n';
import * as auth from '../../actions/auth';
import { connect } from 'react-redux';

interface PropTypes {

}

interface PropTypesExtend extends PropTypes {
    auth: {
        name: string
        lastname: string
    }
    dispatch: CallableFunction
}

interface StateTypes {
    isOpen: boolean
}

const mapProps = (state: any) => ({
    auth: state.auth
});

/**
 *  NavBar que se debe mostrar cuando el usuario no ha iniciado session
 */
class OLogged extends PureComponent<PropTypesExtend, any> {

    handleLogout = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evt.preventDefault();
        this.props.dispatch(auth.logout())
    }

    render() {
        return (
            <Fragment>
                <Navbar color="light" light dark expand="md">
                    <NavbarBrand href="/">
                        {`${this.props.auth.name} ${this.props.auth.lastname}`}
                    </NavbarBrand>

                    <Nav className="ml-auto" navbar>
                        <NavItem className="align-middle">
                            <Link onClick={this.handleLogout} className="nav-link" to="/logout">
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