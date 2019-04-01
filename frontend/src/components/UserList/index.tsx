

import React, { PureComponent, CSSProperties } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import { connect } from 'react-redux';
import { UserList as TUserList } from "../../reducers/users";
import { FriendList } from "../../reducers/friends";

interface PropsType {
    onChangeSelect: CallableFunction
}

interface PropsTypeExtend extends PropsType {
    dispatch: CallableFunction
    userList: TUserList
    friendList: FriendList
}

interface StateProps {
    active: string
}

const mapProps = (state: any) => ({
    userList: state.users.list,
    friendList: state.friends.list
});


interface StylesProps {
    image: CSSProperties
}

const styles: StylesProps = {
    image: {
        height: 30
    }
}

class OUserList extends PureComponent<PropsTypeExtend> {

    state: StateProps = {
        active: ''
    }

    handleClick = (username: string) =>
        (evt: React.MouseEvent<Element, MouseEvent>) => {
            evt.preventDefault();
            this.setState({
                active: username
            });
            this.props.onChangeSelect(username);
        }

    render() {
        const userList = this.props.userList;
        return (
            <ListGroup>
                {userList.map((user, key) => (
                    <ListGroupItem
                        key={key}
                        active={this.state.active === user.username}
                        onClick={this.handleClick(user.username)}>
                        {user.photo ? (
                            <img src={user.photo} style={styles.image} />
                        ): <i className="far fa-user"></i>}
                        &nbsp;&nbsp;
                        {user.name} {user.lastname}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

const UserListConnected = connect(mapProps)(OUserList);

const UserList = (props: PropsType) => <UserListConnected {...props} />

export default UserList;