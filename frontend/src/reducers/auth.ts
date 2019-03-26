

import { auth } from '../actions/actionTypes';

export interface StateProps {
    name: string
    lastname: string
    username: string
    chats: Array<string>
    token: string
}

const initialState: StateProps = {
    name: '',
    lastname: '',
    username: '',
    token: '',
    chats: []
};

export default function (state: StateProps = initialState, action: any) {
    switch (action.type) {
        case auth.logged:
            return { ...state, ...action.session };
        case auth.logout:
            return initialState;
        default:
            return state;
    }
}