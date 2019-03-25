
import React, { PureComponent, Fragment } from 'react';
import { NavBarUnlogged } from '../../components/NavBar';
import {
    Container, Row, Col, Form, FormGroup, Label, Input, FormText,
    Card, CardHeader, CardBody
} from 'reactstrap';
import l18n from '../../l18n';
import Button from 'reactstrap/lib/Button';
import Alert from 'reactstrap/lib/Alert';
import hires_png from '../../assets/HiRes-768x644.png';
import Footer from '../../components/Footer';
import User, { IUser, validate, IUserError } from '../../models/User';
import { connect } from 'react-redux';
import { StateProps as AuthProps } from '../../reducers/auth';
import * as auth from '../../actions/auth';
import AlertError from '../../components/AlertError';

interface PropsType {
    auth: AuthProps
    dispatch: CallableFunction
    history: {
        push: CallableFunction
    }
}

interface StateType extends IUser {
    errors: IUserError | null
    terms_checked: boolean
}

class State extends User {
    errors = null
    terms_checked = false
}

const mapProps = (state: any) => ({
    auth: state.auth
});

/*const mapDispatch = (mapDispatchEvent: CallableFunction) => ({
    actions: {
        register: mapDispatchEvent(auth.register)
    }
});*/

class Register extends PureComponent<PropsType, any> {

    state: StateType = new State();

    handleChangue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleChangueTermsChecked = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [evt.target.name]: !this.state.terms_checked
        })
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        let validation: IUserError = validate(this.state);
        if (validation.$length === 0) {
            let user: IUser = {
                name: this.state.name,
                lastname: this.state.lastname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
            this.props.dispatch(auth.register(user))
                .then(() => {
                    this.props.history.push("/login");
                })
                .catch((error: IUserError | Error) => {
                    if ('$length' in error) {
                        this.setState({
                            errors: error
                        });
                    }
                });
            this.setState({
                errors: null
            })
            return;
        }
        this.setState({
            errors: validation
        });
    }

    render() {
        const errors: IUserError = this.state.errors || { $length: 0 };
        return (
            <Fragment>
                <NavBarUnlogged />
                <br />
                <Container className='chat-container'>
                    <Row>
                        <Col md={{ size: 6 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                            <img style={{ width: '100%' }} src={hires_png} />
                        </Col>
                        <Col md={{ size: 6 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                            <Card>
                                <CardHeader>
                                    {l18n.registerLink}
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col md={{ size: 6 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.name}</Label>
                                                    <Input
                                                        type="text" name="name"
                                                        value={this.state.name}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                    <AlertError error={errors.$name} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 6 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.lastname}</Label>
                                                    <Input
                                                        type="text" name="lastname"
                                                        value={this.state.lastname}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                    <AlertError error={errors.$lastname} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.username}</Label>
                                                    <Input
                                                        type="text" name="username"
                                                        value={this.state.username}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                    <AlertError error={errors.$username} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.email}</Label>
                                                    <Input
                                                        type="text" name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                    <AlertError error={errors.$email} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 6 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.password}</Label>
                                                    <Input
                                                        type="password" name="password"
                                                        value={this.state.password}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 6 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.password_confirm}</Label>
                                                    <Input
                                                        type="password" name="password_confirmation"
                                                        value={this.state.password_confirmation}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 12 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                                                <AlertError style={{}} error={errors.$password} />
                                                <AlertError style={{}} error={errors.$password_confirmation} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Container>
                                                    <FormGroup row>
                                                        <FormGroup check>
                                                            <Label check>
                                                                <Input
                                                                    type="checkbox" name="terms_checked"
                                                                    checked={this.state.terms_checked}
                                                                    onChange={this.handleChangueTermsChecked} />
                                                                {' '}
                                                                {l18n.accept_terms_conditions}
                                                            </Label>
                                                        </FormGroup>
                                                    </FormGroup>
                                                </Container>
                                            </Col>
                                        </Row>
                                        <Button disabled={!this.state.terms_checked}>
                                            {l18n.registerButton}
                                        </Button>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>

                <br />

                <Footer />
            </Fragment>
        );
    }
}

export default connect(mapProps)(Register);