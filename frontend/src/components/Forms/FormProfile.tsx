

import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import AvatarEditor from "../AvatarEditor";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";
import Form from "reactstrap/lib/Form";
import FormGroup from "reactstrap/lib/FormGroup";
import Input from "reactstrap/lib/Input";
import Label from "reactstrap/lib/Label";
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import TabContent from "reactstrap/lib/TabContent";
import TabPane from "reactstrap/lib/TabPane";

interface PropsType {

}

interface PropsTypeExtend extends PropsType {

}

interface StateProps {
    activeTab: string
    preview?: HTMLImageElement
    src: string
}

const src = 'data:image/jpeg;base64,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';

const mapProps = (state: any) => ({

});

class OFormProfile extends PureComponent<PropsTypeExtend, any> {

    state: StateProps = {
        activeTab: '1',
        preview: undefined,
        src: src
    }

    onClose = () => {
        this.setState({ preview: null })
    }

    onCrop = (preview: HTMLImageElement) => {
        this.setState({ preview });
    }

    toggleTab = (tab: string) => () => {
        this.setState({
            activeTab: tab
        });
    }

    render() {
        const active: any = {
            tab1: this.state.activeTab === '1' ? 'active' : '',
            tab2: this.state.activeTab === '2' ? 'active' : ''
        };

        return (
            <Fragment>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={this.toggleTab('1')}
                            className={active.tab1}>
                            Photo
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={this.toggleTab('2')}
                            className={active.tab2}>
                            Personal info
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0 10px',
                            minHeight: 350
                        }}>
                            <div>
                                <AvatarEditor
                                    width={460}
                                    height={320}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                    src={this.state.src}
                                />
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tabId='2'>
                        <div style={{ minHeight: 350 }}>
                            <Form>
                                <Row>
                                    <Col md={6} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>Name</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>LastName</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>Phone</Label>
                                            <Input />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>Description</Label>
                                            <Input
                                                style={{ minHeight: 130 }}
                                                type='textarea'
                                            />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </TabPane>
                </TabContent>
            </Fragment >
        )
    }
}

const FormProfileConnected = connect(mapProps)(OFormProfile);

const FormProfile = (props: PropsType) => <FormProfileConnected />

export default FormProfile;