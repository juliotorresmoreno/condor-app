

import { auth } from './actionTypes';
import { server_url } from '../config';
import { IUser, IUserError } from '../models/User';

interface ILogin {
    email: string
    password: string
}

const meta = server_url + '/auth';

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
    (dispatch: CallableFunction, getState: CallableFunction) => {
        return fetch(meta + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                return response.json()
                    .then((result) => {
                        if (response.ok) {
                            dispatch(logged(result.data));
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error(result.message));
                    })
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            });
    }

export const register = (user: IUser) =>
    (dispatch: CallableFunction, getState: CallableFunction) => {
        return fetch(meta + '/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                return response.json()
                    .then((data) => {
                        if (response.ok) {
                            return Promise.resolve();
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
                            return Promise.reject(error);
                        }
                        return Promise.reject(new Error(data.message));
                    })
            })
            .catch((error: Error) => {
                return Promise.reject(error);
            });
    }