
import * as actionTypes from './actionTypes';
import { server_url } from '../config';
import fetch from '../utils/fetch';
import { Profile } from '../models/Profile';
import * as auth from './auth';

const meta = server_url + '/profile';

export const update = (profile: Profile) =>
    async (dispatch: (action: CallableFunction | any) => void, getState: CallableFunction) => {
        const state = getState();
        const response = await fetch(meta, {
            method: 'POST',
            headers: {
                'Authorization': state.auth.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        });
        const result = await response.json();
        if (response.ok) {
            dispatch(auth.session());
            return;
        }
        throw new Error(result.message);
    }

export const updatePhoto = (image: Blob) =>
    async (dispatch: (action: CallableFunction | any) => void, getState: CallableFunction) => {
        const state = getState();
        const form = new FormData();
        form.append("photo", image);

        const response = await fetch(meta + '/photo', {
            method: 'POST',
            headers: {
                'Authorization': state.auth.token
            },
            body: form
        });
        const result = await response.json();
        if (response.ok) {
            return;
        }
        throw new Error(result.message);
    }
