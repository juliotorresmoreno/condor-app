

import { chats } from '../actions/actionTypes';

export interface Chat {
    _id: string
    name: string
    users: Array<string>
}

export interface ChatList extends Array<Chat> { }

export interface Message {
    user: string
    text: string
}

export interface StateProps {
    list: ChatList
    cache: any
}

const initialState: StateProps = {
    list: [],
    cache: {}
};

export default function (state: StateProps = initialState, action: any) {
    switch (action.type) {
        case chats.list:
            return { ...state, list: action.chats };
        case chats.setCache:
            let cache = state.cache;
            cache[action.chatID] = action.messages;
            return { ...state, cache: { ...cache } }
        default:
            return state;
    }
}