

import { friends } from './actionTypes';
import { server_url } from '../config';
import { UserList } from '../reducers/users';

const meta = server_url + '/friends';

export const setList = (list: UserList) => ({
    type: friends.list,
    users: list
});
