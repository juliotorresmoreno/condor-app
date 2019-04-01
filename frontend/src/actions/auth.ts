

import { auth } from './actionTypes';
import { server_url } from '../config';
import { IUser, IUserError } from '../models/User';
import { setList as usersSetList } from './users';
import { setList as friendsSetList } from './friends';
import fetch from '../utils/fetch';
interface ILogin {
    email: string
    password: string
}

const meta = server_url + '/auth';
const meta_session = server_url + '/session';

interface SessionProps {
    token: string
    username: string
    name: string
    lastname: string
    email: string
}

const logged = (session: { type: string, session: SessionProps }) => ({
    type: auth.logged,
    session: session
});

export const logout = () => ({
    type: auth.logout
});

export const login = (user: ILogin) =>
    async (dispatch: CallableFunction, getState: CallableFunction) => {
        try {
            const response = await fetch(meta + '/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const result = await response.json();
            if (response.ok) {
                dispatch(logged(result.data));
                dispatch(session());
                return Promise.resolve();
            }
            throw new Error(result.message)
        } catch (error) {
            throw error;
        }
    }

export const register = (user: IUser) =>
    async (dispatch: CallableFunction, getState: CallableFunction) => {
        try {
            const response = await fetch(meta + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            const data = await response.json();
            if (response.ok) {
                return;
            }
            if (data.errors != undefined) {
                let error: IUserError = {
                    $name: data.errors.$name ? new Error(data.errors.$name) : undefined,
                    $lastname: data.errors.$lastname ? new Error(data.errors.$lastname) : undefined,
                    $username: data.errors.$username ? new Error(data.errors.$username) : undefined,
                    $email: data.errors.$email ? new Error(data.errors.$email) : undefined,
                    $password: data.errors.$password ? new Error(data.errors.$password) : undefined,
                    $length: data.errors.$length
                };
                throw error;
            }
            throw new Error(data.message);
        } catch (error) {
            throw error;
        }
    }


export const session = () =>
    async (dispatchEvent: CallableFunction, getState: CallableFunction) => {
        const state = getState();
        const response = await fetch(meta_session, {
            headers: {
                'Authorization': state.auth.token
            }
        });
        if (response.ok) {
            const result: { session: any, users: Array<any> } = await response.json();
            dispatchEvent(logged(result.session));
            dispatchEvent(usersSetList(result.users));
            dispatchEvent(friendsSetList(result.users));
            return;
        }
        dispatchEvent(logout());
    }