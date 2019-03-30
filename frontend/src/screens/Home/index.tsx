
import React, { PureComponent, Fragment, CSSProperties } from "react";
import { NavBarLogged } from "../../components/NavBar";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Conversation from "../../components/Conversation";
import SearchUsersBar from "../../components/SearchUsersBar";
import UserList from "../../components/UserList";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import classnames from 'classnames';
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";
import * as chats from '../../actions/chats';
import { connect } from 'react-redux';
import ChatList from "../../components/ChatList";
import DialogUserAdd from "../../components/Dialog/DialogUserAdd";
import { resolve } from "url";

interface PropsType {

}

interface PropsTypeExtend {
    dispatch: CallableFunction
}

interface StateProps {
    activeChat: string
    activeTab: string
}

const mapProps = (state: any) => ({
    chatList: state.chats.list
});

interface StylesProps {
    conversation: CSSProperties
    conversation_container: CSSProperties
    actions: CSSProperties
}

const styles: StylesProps = {
    conversation_container: {
        display: 'flex',
        flex: 1
        //flexDirection: 'column'
    },
    conversation: {
        flex: 1
    },
    actions: {
        marginRight: 10
    }
}
class OHome extends PureComponent<PropsTypeExtend, any> {

    state: StateProps = {
        activeChat: '',
        activeTab: '1'
    }

    componentDidMount() {
        //this.props.dispatch(chats.list());
    }

    toggle = (tab: string) => () => {
        this.setState({
            activeTab: tab
        });
    }

    handleChangeChatSelect = (chatID: string) => {
        this.setState({ activeChat: chatID });
        this.props.dispatch(chats.load(chatID));
    }

    handleChangeUserSelect = async (username: string) => {
        const chatID = await this.props.dispatch(chats.create(username));
        this.setState({
            activeTab: "1",
            activeChat: chatID
        });
    }

    render() {
        const { activeChat, activeTab } = this.state;
        return (
            <Fragment>
                <NavBarLogged />
                <br />

                <Container className="chat-container">
                    <Row>
                        <Col style={styles.conversation_container} md={{ size: 8 }}>
                            <div style={styles.actions}>
                                <DialogUserAdd chatID={this.state.activeChat} />
                            </div>
                            <Conversation
                                style={styles.conversation}
                                chatID={this.state.activeChat}
                                disabled={activeChat === ''} />
                        </Col>
                        <Col className='container-user-list' md={{ size: 4 }}>
                            <Nav tabs>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '1' })}
                                        onClick={this.toggle('1')}
                                    >
                                        <i className="far fa-comments"></i>
                                        &nbsp;
                                        Chats
                                        </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        className={classnames({ active: activeTab === '2' })}
                                        onClick={this.toggle('2')}
                                    >
                                        <i className="fas fa-search"></i>
                                        &nbsp;
                                        Ecuentra gente
                                        </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={activeTab}>
                                {this.state.activeTab == '1' ?
                                    <TabPane className='container-user-list' tabId="1">
                                        <div className='list'>
                                            <ChatList
                                                active={this.state.activeChat}
                                                onChangeSelect={this.handleChangeChatSelect}
                                            />
                                        </div>
                                        <SearchUsersBar />
                                    </TabPane> : false}
                                {this.state.activeTab == '2' ?
                                    <TabPane className='container-user-list' tabId="2">
                                        <div className='list'>
                                            <UserList onChangeSelect={this.handleChangeUserSelect} />
                                        </div>
                                        <SearchUsersBar />
                                    </TabPane> : false}
                            </TabContent>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        );
    }
}

const HomeConnected = connect(mapProps)(OHome);

const Home = (props: PropsType) => <HomeConnected {...props} />

export default Home;