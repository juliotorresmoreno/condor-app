
import React, { PureComponent, Fragment, CSSProperties } from "react";
import { NavBarLogged } from "../../components/NavBar";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import { Col } from "reactstrap";
import Conversation from "../../components/Conversation";
import SearchBar from "../../components/SearchBar";
import UserList from "../../components/UserList";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import classnames from 'classnames';
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";

interface PropsType {

}

interface StateProps {
    active: string
    activeTab: string
}

class Home extends PureComponent<PropsType, any> {

    state: StateProps = {
        active: '',
        activeTab: '1'
    }

    toggle = (tab: string) => () => {
        this.setState({
            activeTab: tab
        });
    }

    handleChangeSelect = (username: string) => {
        this.setState({ active: username });
    }

    render() {
        return (
            <Fragment>
                <NavBarLogged />
                <br />

                <Container className="chat-container">
                    <Row>
                        <Col md={{ size: 8 }}>
                            <Conversation disabled={this.state.active === ''} />
                        </Col>
                        <Col md={{ size: 4 }}>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={this.toggle('1')}
                                    >
                                        Chats
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={this.toggle('2')}
                                    >
                                        Ecuentra gente
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="1">

                                </TabPane>
                                <TabPane tabId="2">
                                    <UserList onChangeSelect={this.handleChangeSelect} />

                                    <SearchBar />
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

export default Home;