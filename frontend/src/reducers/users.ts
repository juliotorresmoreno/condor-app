

import { users } from '../actions/actionTypes';

export interface User {
    name: string
    lastname: string
    username: string
}

export interface UserList extends Array<User> { }

export interface StateProps {
    list: UserList
}

const initialState: StateProps = {
    list: []
};

export default function (state: any = initialState, action: any) {
    switch (action.type) {
        case users.list:
            return { ...state, list: action.users };
        default:
            return state;
    }
}