

import { friends } from '../actions/actionTypes';

export interface Friend {
    name: string
    lastname: string
    username: string
}

export interface FriendList extends Array<Friend> { }

export interface StateProps {
    list: FriendList
}

const initialState: StateProps = {
    list: []
};

export default function (state: StateProps = initialState, action: any) {
    switch (action.type) {
        case friends.list:
            return { ...state, list: action.users };
        default:
            return state;
    }
}