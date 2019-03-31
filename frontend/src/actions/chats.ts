

import { chats } from './actionTypes';
import { server_url } from '../config';
import { ChatList } from '../reducers/chats';
import fetch from '../utils/fetch';

const meta = server_url + '/chats';

const setList = (data: ChatList) => ({
    type: chats.list,
    chats: data
});

/**
 * Trae los chats del usuario
 * @param q criterio de busqueda
 */
export const list = (q: string = '') =>
    async (dispatchEvent: CallableFunction, getState: CallableFunction) => {
        try {
            const state = getState();
            const response = await fetch(`${meta}?q=${q}`, {
                headers: {
                    Authorization: state.auth.token,
                }
            });
            const result = await response.json();
            if (response.ok) {
                dispatchEvent(setList(result.data));
                return;
            }
            throw new Error(result.message);
        } catch (error) {
            throw error;
        }
    }

export const create = (user: string) =>
    async (dispatchEvent: CallableFunction, getState: CallableFunction) => {
        try {
            const state = getState();
            const response = await fetch(meta, {
                method: 'PUT',
                headers: {
                    Authorization: state.auth.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user })
            });
            const result = await response.json();
            if (response.ok) {
                dispatchEvent(list());
                return result.chatID;
            }
            throw new Error(result.message);
        } catch (error) {
            throw error;
        }
    }


export const post = (chatID: string, text: string) =>
    async (dispatchEvent: CallableFunction, getState: CallableFunction) => {
        const state = getState();
        const response = await fetch(`${meta}/${chatID}`, {
            method: 'POST',
            headers: {
                Authorization: state.auth.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });
        const result = await response.json();
        if (response.ok) {
            return;
        }
        return new Error(result.message);
    }

export const setCache = (chatID: string, messages: Array<any>) => ({
    type: chats.setCache,
    chatID,
    messages
});

export const load = (chatID: string) =>
    async (dispatchEvent: CallableFunction, getState: CallableFunction) => {
        const state = getState();
        const response = await fetch(`${meta}/${chatID}?t=` + Date.now(), {
            headers: {
                Authorization: state.auth.token
            }
        });
        const result = await response.json();
        if (response.ok) {
            dispatchEvent(setCache(chatID, result.messages));
            return;
        }
        throw new Error(result.message);
    }

export const appendUser = (chatID: string, username: string) =>
    async (dispatchEvent: CallableFunction, getState: CallableFunction) => {
        const state = getState();
        const response = await fetch(`${meta}/${chatID}/append`, {
            method: 'PUT',
            headers: {
                Authorization: state.auth.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user: username })
        });
        const result = await response.json();
        if (response.ok) {

            return;
        }
        throw new Error(result.message);
    }

