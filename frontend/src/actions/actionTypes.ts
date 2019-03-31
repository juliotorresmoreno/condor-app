

const _auth: string = '@auth';

/**
 * Listado de acciones
 */
export const auth = {

    /**
     * Este evento no hace nada, esta definido para informar de un intento de login
     */
    login: _auth + '/login',

    /**
     * Este evento ocurre cuando el proceso de login es exitoso
     */
    logged: _auth + '/logged',

    /**
     * 
     */
    logout: _auth + '/logout'
}



const _users: string = '@users';

/**
 * 
 */
export const users = {
    
    /**
     * 
     */
    list: _users + '/list'
}



const _friends: string = '@friends';

/**
 * 
 */
export const friends = {
    
    /**
     * 
     */
    list: _friends + '/list'
}



const _chats: string = '@chats';

/**
 * 
 */
export const chats = {
    
    /**
     * 
     */
    list: _chats + '/list',


    /**
     * 
     */
    setCache: _chats + '/setCache',

    /**
     * 
     */
    message: _chats + '/message'
}



const _profile: string = '@profile';

/**
 * 
 */
export const profile = {

    /**
     * 
     */
    update: _profile + '/update'
}

