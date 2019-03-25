

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