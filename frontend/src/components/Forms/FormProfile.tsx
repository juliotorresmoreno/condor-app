

import React, { PureComponent, Fragment, CSSProperties } from "react";
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
import l18n from '../../l18n';
import { Profile } from "../../models/Profile";

export interface ChangeEventValue {
    name: string
    value: string | HTMLImageElement
}
interface PropsType {
    onChangue: (evt: ChangeEventValue) => void
}

interface PropsTypeExtend extends PropsType {
    auth: Profile
}

interface StateProps {
    activeTab: string
    preview: HTMLImageElement | null
    src: string

    name: string
    lastname: string
    phone: string
    description: string

    [key: string]: HTMLImageElement | string | null
}

interface StylesProps {
    textarea: CSSProperties
}

const styles: StylesProps = {
    textarea: {
        minHeight: 143,
        resize: 'none'
    }
}

const mapProps = (state: any) => ({
    auth: state.auth
});

class OFormProfile extends PureComponent<PropsTypeExtend, any> {

    state: StateProps

    constructor(props: PropsTypeExtend) {
        super(props);

        const state: StateProps = {
            activeTab: '1',
            preview: null,
            src: '', //props.auth.photo ? props.auth.photo: '',

            name: props.auth.name,
            lastname: props.auth.lastname,
            phone: props.auth.phone,
            description: props.auth.description
        }
        this.state = state;

        const fields: Array<string> = ['name', 'lastname', 'phone', 'description', 'preview'];
        const _auth: any = props.auth as any;
        fields.forEach((field: string) => {
            const tmp = _auth[field];
            if (!tmp) return;
            const eventValue: any = {
                name: field,
                value: _auth[field]
            };
            this.props.onChangue(eventValue);
        });
    }

    onClose = () => {
        this.setState({ preview: null })
    }

    onCrop = (preview: HTMLImageElement) => {
        this.setState({ preview });
        const eventValue: ChangeEventValue = {
            name: 'preview',
            value: preview
        };
        this.props.onChangue(eventValue);
    }

    toggleTab = (tab: string) => () => {
        this.setState({
            activeTab: tab
        });
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
        const eventValue: ChangeEventValue = {
            name: evt.target.name,
            value: evt.target.value
        };
        this.props.onChangue(eventValue);
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
                            {l18n.photo_tab_title}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={this.toggleTab('2')}
                            className={`tab_personal_info ${active.tab2}`}>
                            {l18n.photo_tab_personal_info}
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
                                    width={460} height={320}
                                    onCrop={this.onCrop}
                                    onClose={this.onClose}
                                    src={this.state.preview as any}
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
                                            <Label>{l18n.name}</Label>
                                            <Input
                                                name='name'
                                                value={this.state.name}
                                                onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>{l18n.lastname}</Label>
                                            <Input
                                                name='lastname'
                                                value={this.state.lastname}
                                                onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>{l18n.phone}</Label>
                                            <Input
                                                name='phone'
                                                value={this.state.phone}
                                                onChange={this.handleChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={12} xs={12}>
                                        <FormGroup>
                                            <Label>{l18n.description}</Label>
                                            <Input
                                                type='textarea'
                                                name='description'
                                                value={this.state.description}
                                                style={styles.textarea}
                                                onChange={this.handleChange}
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

const FormProfile = (props: PropsType) =>
    <FormProfileConnected {...props} />

export default FormProfile;