

import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import FormProfile from "../Forms/FormProfile";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ModalHeader from "reactstrap/lib/ModalHeader";

interface PropsType {
    isOpen?: boolean
}

interface PropsTypeExtend extends PropsType {
    isOpen: boolean
}

interface StateProps {

}

const mapProps = (state: any) => ({

});

class ODialogProfile extends PureComponent<PropsTypeExtend, any> {

    static defaultProps: PropsType = {
        
    }

    state: StateProps = {

    }

    handleProfileClick = () => {

    }

    toggle = () => {

    }

    render() {
        return (
            <Fragment>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>
                        Profile
                    </ModalHeader>
                    <ModalBody>
                        <FormProfile />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary">
                            <i className="fas fa-save"></i>
                            &nbsp;&nbsp;
                            Save
                        </Button>{' '}
                        <Button
                            color="secondary"
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

const DialogProfileConnected = connect(mapProps)(ODialogProfile);

const DialogProfile = (props: PropsType) => <DialogProfileConnected {...props} />

export default DialogProfile;