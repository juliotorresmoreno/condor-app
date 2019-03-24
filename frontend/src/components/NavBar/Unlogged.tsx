import React, { PureComponent, Fragment } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from 'react-router-dom';
import l18n from '../../l18n';

interface PropTypes {

}

interface StateTypes {
    isOpen: boolean
}

/**
 *  NavBar que se debe mostrar cuando el usuario no ha iniciado session
 */
export default class Unlogged extends PureComponent<PropTypes, StateTypes> {

    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
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
                                <Link className="nav-link" to="/login">
                                    {l18n.loginLink}
                                </Link>
                            </NavItem>
                            <NavItem className="align-middle">
                                <Link className="nav-link" to="/register">
                                    {l18n.registerLink}
                                </Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Fragment>
        );
    }
}
