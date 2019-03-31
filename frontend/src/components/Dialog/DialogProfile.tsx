

import React, { PureComponent, Fragment, CSSProperties } from "react";
import { connect } from "react-redux";
import FormProfile, { ChangeEventValue } from "../Forms/FormProfile";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import ModalHeader from "reactstrap/lib/ModalHeader";
import l18n from '../../l18n';
import { Profile } from "../../models/Profile";
import * as profile from "../../actions/profile";
import b64toBlob from "../../utils/b64toBlob";

/**
 * 
 */
interface PropsType {
    isOpen?: boolean
    toggle: CallableFunction
}

/**
 * 
 */
interface PropsTypeExtend extends PropsType {
    isOpen: boolean
    dispatch: (action: CallableFunction | any) => Promise<any>
}

/**
 * 
 */
interface StateProps {
    name: string
    lastname: string
    phone: string
    description: string

    preview: HTMLImageElement | null
}

/**
 * 
 * @param state 
 */
const mapProps = (state: any) => ({

});

/**
 * 
 */
interface StylesProps {
    button: CSSProperties
}

/**
 * 
 */
const styles: StylesProps = {
    button: {
        width: 100
    }
}
class ODialogProfile extends PureComponent<PropsTypeExtend, any> {

    static defaultProps: PropsType = {
        isOpen: false,
        toggle: () => void (0)
    }

    state: StateProps = {
        name: '',
        lastname: '',
        phone: '',
        description: '',
        preview: null
    }

    b64toBlob(b64Data: any, contentType?: any, sliceSize?: any) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    handleSaveClick = async () => {
        const promises = [];
        if (this.state.preview) {
            const image = b64toBlob(this.state.preview);
            promises.push(this.props.dispatch(profile.updatePhoto(image)));
        }
        const user_profile: Profile = {
            name: this.state.name,
            lastname: this.state.lastname,
            phone: this.state.phone,
            description: this.state.description
        }
        promises.push(this.props.dispatch(profile.update(user_profile)));
        await Promise.all(promises);
        this.props.toggle();
    }

    handleCancelClick = () => {
        this.props.toggle();
    }

    handleChange = (evt: ChangeEventValue) => {
        this.setState({
            [evt.name]: evt.value
        });
    }

    render() {
        return (
            <Fragment>
                <Modal isOpen={this.props.isOpen}>
                    <ModalHeader>
                        {l18n.profile_title}
                    </ModalHeader>
                    <ModalBody>
                        <FormProfile
                            onChangue={this.handleChange}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            style={styles.button}
                            onClick={this.handleSaveClick}>
                            <i className="fas fa-save"></i>
                            &nbsp;&nbsp;
                            {l18n.save_text}
                        </Button>{' '}
                        <Button
                            color="secondary"
                            style={styles.button}
                            onClick={this.handleCancelClick}>
                            <i className="fas fa-times"></i>
                            &nbsp;&nbsp;
                            {l18n.cancel_text}
                        </Button>
                    </ModalFooter>
                </Modal>
            </Fragment>
        );
    }
}

const DialogProfileConnected = connect(mapProps)(ODialogProfile);

/**
 * 
 * @param props 
 */
const DialogProfile = (props: PropsType) =>
    <DialogProfileConnected {...props} />

export default DialogProfile;