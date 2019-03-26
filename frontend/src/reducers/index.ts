

import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import chats from './chats';
import friends from './friends';


export default combineReducers({
    auth, users, chats, friends
});


