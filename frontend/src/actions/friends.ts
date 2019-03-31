

import { friends } from './actionTypes';
import { server_url } from '../config';
import { UserList } from '../reducers/users';
import fetch from '../utils/fetch';

const meta = server_url + '/friends';

export const setList = (list: UserList) => ({
    type: friends.list,
    users: list
});
