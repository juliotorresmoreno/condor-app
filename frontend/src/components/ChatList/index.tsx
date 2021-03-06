import React, { PureComponent, Fragment, CSSProperties } from "react";
import { connect } from "react-redux";
import { Chat as ChatItem, ChatList as TChatList } from '../../reducers/chats';
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import { FriendList, Friend } from "../../reducers/friends";

interface PropsType {
    active: string
    onChangeSelect: CallableFunction
}

interface PropsTypeExtend extends PropsType {
    username: string
    chatList: TChatList
    friendList: FriendList
}

interface StylesProps {
    image: CSSProperties
}

const styles: StylesProps = {
    image: {
        height: 30
    }
}

const mapProps = (state: any) => ({
    username: state.auth.username,
    chatList: state.auth.chats,
    friendList: state.friends.list
});

class OChatList extends PureComponent<PropsTypeExtend, any> {

    isActive = (chat: ChatItem) => {
        return this.props.active === chat._id;
    }

    handleClick = (chat: ChatItem) =>
        (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
            this.props.onChangeSelect(chat._id);
        }

    renderUser = (username: string, key: number, comma: boolean): JSX.Element | boolean => {
        const friendList = this.props.friendList;
        if (username === this.props.username || !friendList)
            return false;
        const user: Friend | undefined = friendList.find((x: Friend) =>
            x.username === username
        );
        if (!user) return false;

        return (
            <Fragment key={key}>
                {comma ? <Fragment>,&nbsp;</Fragment> : false}
                <span>
                    {user.photo ? (
                        <img src={user.photo} style={styles.image} />
                    ): <i className="far fa-user"></i>}
                    &nbsp;&nbsp;
                    {user.name} {user.lastname}
                </span>
            </Fragment>
        );
    }

    renderUsers = (chat: ChatItem): JSX.Element => {
        var count = 0;
        return (
            <Fragment>
                {chat.users.map((username: string, key: number) => {
                    if (username != this.props.username)
                        count++;
                    return this.renderUser(username, key, count > 1)
                })}
            </Fragment>
        );
    }

    renderChat = (chat: ChatItem, key: number) => (
        <Fragment key={key}>
            <ListGroupItem
                active={this.isActive(chat)}
                onClick={this.handleClick(chat)}>
                {this.renderUsers(chat)}
            </ListGroupItem>
        </Fragment>
    )

    render() {
        return (
            <ListGroup>
                {this.props.chatList.map(this.renderChat)}
            </ListGroup>
        )
    }
}

const ChatListConnected = connect(mapProps)(OChatList);

const ChatList = (props: PropsType) => <ChatListConnected {...props} />

export default ChatList;