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
    dispatch: CallableFunction
}

interface StateTypes {
    isOpen: boolean
}

const mapProps = (state: any) => ({

});

/**
 *  NavBar que se debe mostrar cuando el usuario no ha iniciado session
 */
class OLogged extends PureComponent<PropTypesExtend, any> {

    state: StateTypes = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleLogout = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        evt.preventDefault();
        this.props.dispatch(auth.logout())
    }

    render() {
        return (
            <Fragment>
                <Navbar color="light" light dark expand="md">
                    <NavbarBrand href="/">{l18n.brand}</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem className="align-middle">
                                <Link onClick={this.handleLogout} className="nav-link" to="/logout">
                                    {l18n.logoutLink}
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        );
    }
}

const LoggedConnect = connect(mapProps)(OLogged);

const Logged = (props: PropTypes) => <LoggedConnect {...props} />

export default Logged;