

import { auth } from '../actions/actionTypes';

export interface StateProps {
    name: string,
    lastname: string,
    username: string,
    token: string
}

const initialState: StateProps = {
    name: '',
    lastname: '',
    username: '',
    token: ''
};

export default function (state: any = initialState, action: any) {
    switch (action.type) {
        case auth.logged:
            return { state, ...action.session };
        case auth.logout:
            return initialState;
        default:
            return state;
    }
}