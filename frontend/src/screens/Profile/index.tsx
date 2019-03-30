

import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { NavBarLogged } from "../../components/NavBar";
import Container from "reactstrap/lib/Container";
import FormProfile from "../../components/Forms/FormProfile";

interface PropsType {

}

interface PropsTypeExtend extends PropsType {

}

interface StateProps {

}

const mapProps = (state: any) => ({

});

class OProfile extends PureComponent<PropsTypeExtend, any> {

    state: StateProps = {

    }

    render() {
        return (
            <Fragment>
                <NavBarLogged />

                <br />

                <Container className='profile-container'>
                    <FormProfile />
                </Container>
            </Fragment>
        );
    }
}

const ProfileConnected = connect(mapProps)(OProfile);

const Profile = (props: PropsType) => <ProfileConnected {...props} />;

export default Profile;