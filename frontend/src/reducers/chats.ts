

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
    let cache;
    switch (action.type) {
        case chats.list:
            return { ...state, list: action.chats };
        case chats.setCache:
            cache = state.cache;
            cache[action.chatID] = action.messages;
            return { ...state, cache: { ...cache } }
        case chats.message:
            cache = state.cache;
            if (!cache[action.chatID])
                cache[action.chatID] = [];
            cache[action.chatID].push(action.message);
            return { ...state, cache: { ...cache } }
        default:
            return state;
    }
}