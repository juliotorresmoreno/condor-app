
import React, { PureComponent, Fragment } from 'react';
import { NavBarUnlogged } from '../../components/NavBar';
import {
    Container, Row, Col, Form, FormGroup, Label, Input, FormText,
    Card, CardHeader, CardBody
} from 'reactstrap';
import l18n from '../../l18n';
import Button from 'reactstrap/lib/Button';
import Footer from '../../components/Footer';
import AlertError from '../../components/AlertError';
import { connect } from 'react-redux';
import * as auth from '../../actions/auth';
import { Redirect } from 'react-router';

interface PropsType {
    
}

interface PropsTypeExtend extends PropsType {
    auth: {
        token: string
    }
    dispatch: CallableFunction
}

interface StateProps {
    email: string
    password: string

    error?: Error
}

const mapProps = (state: any) => ({
    auth: { token: state.auth.token }
});

class OLogin extends PureComponent<PropsTypeExtend, any> {

    state: StateProps = {
        email: '',
        password: ''
    }

    handleChangue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();

        if (this.state.email === '') {
            this.setState({
                error: new Error(l18n.error_email_is_required)
            });
            return;
        }

        this.props.dispatch(auth.login({
            email: this.state.email,
            password: this.state.password
        }));
    }

    render() {
        if (this.props.auth.token) {
            return <Redirect to='/' push />
        }
        return (
            <Fragment>
                <NavBarUnlogged />
                <br />
                <Container style={{ minHeight: 500 }}>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }} sm={{ size: 12 }} xs={{ size: 12 }}>
                            <Card>
                                <CardHeader>
                                    {l18n.loginLink}
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            <Col md={{ size: 12, sm: 12, xs: 12 }}>
                                                <FormGroup>
                                                    <Label>{l18n.email}</Label>
                                                    <Input
                                                        type="email" name="email"
                                                        value={this.state.email}
                                                        onChange={this.handleChangue} />
                                                    <FormText color="muted">

                                                    </FormText>
                                                </FormGroup>
                                            </Col>
                                            <Col md={{ size: 12, sm: 12, xs: 12 }}>
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
                                            <Col md={{ size: 12, sm: 12, xs: 12 }}>
                                                <AlertError error={this.state.error} />
                                            </Col>
                                        </Row>
                                        <Button>
                                            {l18n.loginButton}
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

const LoginConnect = connect(mapProps)(OLogin);

const Login = (props: PropsType) => <LoginConnect {...props} />

export default Login;