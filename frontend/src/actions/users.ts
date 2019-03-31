

import { users } from './actionTypes';
import { server_url } from '../config';
import { UserList } from '../reducers/users';
import fetch from '../utils/fetch';

const meta = server_url + '/users';

export const setList = (list: UserList) => ({
    type: users.list,
    users: list
});

export const list = (q: string) =>
    async (dispatch: CallableFunction, getState: CallableFunction) => {
        try {
            const state = getState();
            const response = await fetch(`${meta}?q=${q}`, {
                headers: {
                    Authorization: state.auth.token
                }
            });
            const result: any = await response.json();
            if (response.ok) {
                dispatch(setList(result.data));
                return
            }
        } catch (error) {
            throw error;
        }
    }