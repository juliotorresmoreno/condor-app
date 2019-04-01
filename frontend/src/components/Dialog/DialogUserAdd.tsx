

import React, { PureComponent, Fragment, CSSProperties } from "react";
import { connect } from "react-redux";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import UserList from "../UserList";
import SearchUsersBar from "../SearchUsersBar";
import * as chats from '../../actions/chats';

interface PropsType {
    chatID: string
}

interface PropsTypeExtend extends PropsType {
    dispatch: CallableFunction
}

interface StateProps {
    isOpen: boolean
    activeUser: string
}

const mapProps = (state: any) => ({

});

interface StylesProps {
    searchBar: CSSProperties
    userListContainer: CSSProperties
    actionButton: CSSProperties
}

const styles: StylesProps = {
    searchBar: {
        marginBottom: 10
    },
    userListContainer: {
        height: 350,
        overflowX: 'auto'
    },
    actionButton: {
        width: 110
    }
};

class ODialogUserAdd extends PureComponent<PropsTypeExtend, any> {

    state: StateProps = {
        isOpen: false,
        activeUser: ''
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleAddUserClick = () => this.toggle();

    handleSaveClick = async () => {
        await this.props.dispatch(chats.appendUser(this.props.chatID, this.state.activeUser));
        this.toggle();
    }

    handleUserListChangeSelect = (username: string) => {
        this.setState({
            activeUser: username
        });
    }

    render() {
        return (
            <Fragment>
                <Button disabled={!this.props.chatID} onClick={this.handleAddUserClick}>
                    <i className="fas fa-user-plus"></i>
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalBody>
                        <SearchUsersBar style={styles.searchBar} />
                        <div style={styles.userListContainer}>
                            <UserList onChangeSelect={this.handleUserListChangeSelect} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            disabled={!this.state.activeUser}
                            style={styles.actionButton}
                            onClick={this.handleSaveClick}>
                            <i className="fas fa-save"></i>
                            &nbsp;&nbsp;
                            Add
                        </Button>{' '}
                        <Button
                            color="secondary"
                            style={styles.actionButton}
                            onClick={this.toggle}>
                            <i className="fas fa-times"></i>
                            &nbsp;&nbsp;
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

const DialogUserAddConnected = connect(mapProps)(ODialogUserAdd);

const DialogUserAdd = (props: PropsType) => <DialogUserAddConnected {...props} />;

export default DialogUserAdd;

