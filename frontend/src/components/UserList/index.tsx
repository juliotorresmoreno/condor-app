

import React, { PureComponent, Fragment } from "react";
import ListGroup from "reactstrap/lib/ListGroup";
import ListGroupItem from "reactstrap/lib/ListGroupItem";
import { connect } from 'react-redux';
import { UserList as DUserList } from "../../reducers/users";

interface PropsType {
    onChangeSelect: CallableFunction
}

interface PropsTypeExtend extends PropsType {
    userList: DUserList
    dispatch: CallableFunction
}

interface StateProps {
    active: string
}

const mapProps = (state: any) => ({
    userList: state.users.list
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
        return (
            <Fragment>
                <ListGroup>
                    {this.props.userList.map((value, key) => (
                        <ListGroupItem
                            key={key} tag="a" href=""
                            active={this.state.active === value.username}
                            onClick={this.handleClick(value.username)}>
                            {value.name} {value.lastname}
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </Fragment>
        );
    }
}

const UserListConnected = connect(mapProps)(OUserList);

const UserList = (props: PropsType) => <UserListConnected {...props} />

export default UserList;