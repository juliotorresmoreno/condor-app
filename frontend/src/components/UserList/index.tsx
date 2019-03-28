

import React, { PureComponent } from "react";
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
                {userList.map((value, key) => (
                    <ListGroupItem
                        key={key}
                        active={this.state.active === value.username}
                        onClick={this.handleClick(value.username)}>
                        <i className="far fa-user"></i>
                        &nbsp;
                        {value.name} {value.lastname}
                    </ListGroupItem>
                ))}
            </ListGroup>
        );
    }
}

const UserListConnected = connect(mapProps)(OUserList);

const UserList = (props: PropsType) => <UserListConnected {...props} />

export default UserList;