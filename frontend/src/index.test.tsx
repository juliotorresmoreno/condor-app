import React from 'react';
import ReactDOM from 'react-dom';
import Application from './application';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from './store';
import Root from './application/Root';
import * as auth from './actions/auth';
import { MongoClient, Db, Collection } from 'mongodb';
import config from '../../backend/config';
import { AssertionError } from 'assert';
import fs from 'fs';
import * as profile from './actions/profile';
import { Profile } from './models/Profile';


let div: HTMLDivElement;
let conn: MongoClient;
let db: Db;

beforeEach(async () => {
    const tmp: any = await MongoClient.connect(config.dsn);
    db = tmp.db(tmp.s.options.dbName) as Db;
    conn = tmp as MongoClient;

    div = document.createElement('div');
    ReactDOM.render((
        <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
                <Root />
            </Provider>
        </MemoryRouter>
    ), div);
    document.body.appendChild(div);
});

it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(<Application />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing - Login', async () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <MemoryRouter initialEntries={["/login"]}>
            <Provider store={store}>
                <Root />
            </Provider>
        </MemoryRouter>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing - Register', async () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <MemoryRouter initialEntries={["/register"]}>
            <Provider store={store}>
                <Root />
            </Provider>
        </MemoryRouter>
    ), div);
    ReactDOM.unmountComponentAtNode(div);
});

it('action - Register invalid', async () => {
    try {
        await auth.register({
            name: "",
            lastname: "",
            email: "",
            username: "",
            password: "",
            password_confirmation: ""
        })(store.dispatch, store.getState);
        throw new Error('Validations no working.')
    } catch (error) {

    }
});

const defaultUser = {
    name: "name",
    lastname: "lastname",
    email: "person@domain.com",
    username: "username",
    password: "PasW0$d1",
    password_confirmation: "PasW0$d1"
};

const defaultInvalidUser = {
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: ""
};

it('action - Register - remove user', async () => {
    await db.collection("users").deleteOne({ email: defaultUser.email });
});

it('action - Register invalid', async () => {
    try {
        await auth.register(defaultInvalidUser)(store.dispatch, store.getState);
        throw new Error('Server validation has failed');
    } catch (error) {

    }
});

it('action - Register', async () => {
    await auth.register(defaultUser)(store.dispatch, store.getState);
});

it('action - view user', async () => {
    const user: Profile | null = await db.collection('users').findOne({
        email: defaultUser.email
    });
    if (user === null) {
        expect(user).not.toBeNull();
        return;
    }
    expect(user.name).toEqual(defaultUser.name);
    expect(user.lastname).toEqual(defaultUser.lastname);
    expect(user.phone).toBeUndefined()
    expect(user.description).toBeUndefined()
});

it('action - Register user exists', async () => {
    try {
        await auth.register(defaultUser)(store.dispatch, store.getState);
        throw new Error('Server validation has failed');
    } catch (error) {

    }
});

it('action - Login', async () => {
    await auth.login({
        email: defaultUser.email,
        password: defaultUser.password,
    })(store.dispatch, store.getState);
});

it('renders without crashing - Main', async () => {
    const div = document.createElement('div');
    ReactDOM.render((
        <MemoryRouter initialEntries={["/"]}>
            <Provider store={store}>
                <Root />
            </Provider>
        </MemoryRouter>
    ), div);

    if (div.querySelectorAll(".container-card-conversation").length !== 1) {
        throw new AssertionError({
            message: ".container-card-conversation not found"
        });
    }
    ReactDOM.unmountComponentAtNode(div);
});


it('renders without crashing - Change Profile', async () => {
    const button1: HTMLLinkElement | null = div.querySelector("a.navbar-brand");
    if (button1 === null) {
        throw new AssertionError({
            message: "a.navbar-brand not found"
        });
    }
    button1.click();

    const button2: HTMLLinkElement | null = document.querySelector(".modal-body .tab_personal_info");
    if (button2 === null) {
        throw new AssertionError({
            message: "personal info not found"
        });
    }
    button2.click();

    const form_name: HTMLInputElement | null = document.querySelector(".modal-body input[name=name]");
    if (form_name === null) {
        throw new AssertionError({
            message: "personal info not found"
        });
    }
    form_name.value = "TestName";
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, false);
    form_name.dispatchEvent(evt);

    const button_submit: HTMLButtonElement | null = document.querySelector(".modal-footer .save");
    if (button_submit === null) {
        throw new AssertionError({
            message: "Submit button not found"
        });
    }
    button_submit.dispatchEvent(new MouseEvent('click'));
    await button_submit.click();

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000)
    });
});

it('action - profile update', async () => {
    await profile.update({
        name: "test2",
        lastname: "test2",
        description: "test2",
        phone: "555 5555"
    })(store.dispatch, store.getState);
});

it('action - view profile', async () => {
    const user: Profile | null = await db.collection('users').findOne({
        email: defaultUser.email
    });
    if (user === null) {
        expect(user).not.toBeNull();
        return;
    }
    expect(user.name).toEqual('test2');
    expect(user.lastname).toEqual('test2');
    expect(user.phone).toEqual('555 5555');
    expect(user.description).toEqual('test2');
});

afterEach(async () => {
    setTimeout(() => {
        ReactDOM.unmountComponentAtNode(div);
        conn.close();
    }, 1000);
});