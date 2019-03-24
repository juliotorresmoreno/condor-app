
import l18n from '../l18n';

export interface IUser {
    name: string
    lastname: string
    username: string
    email: string
    password: string
    password_confirmation?: string
}

export interface IUserError {
    $name?: Error
    $lastname?: Error
    $username?: Error
    $email?: Error
    $password?: Error
    $password_confirmation?: Error
    $length: number
}

export class UserError {
    name: string = '';
    message: string = '';
    stack: string | undefined = '';
    $length: number = 0;

    constructor(message?: string | undefined) {
        let tmp = new Error(message);
        this.name = tmp.name;
        this.message = tmp.message;
        this.stack = tmp.stack;
    }
}

const validations = {
    name: /^([a-zA-Z]{3,}\s?){1,5}$/,
    lastname: /^([a-zA-Z]{3,}\s?){1,5}$/,
    username: /^[A-Za-z]([A-Za-z0-9_]){2,}$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
}

export const validate = function (user: IUser, confirm: boolean = false): IUserError {
    let error: IUserError = new UserError();
    if (!validations.name.test(user.name)) {
        error.$name = new Error(l18n.error_name_is_invalid);
        error.$length++;
    }
    if (!validations.lastname.test(user.lastname)) {
        error.$lastname = new Error(l18n.error_lastname_is_invalid);
        error.$length++;
    }
    if (!validations.username.test(user.username)) {
        error.$username = new Error(l18n.error_username_is_invalid);
        error.$length++;
    }
    if (!validations.email.test(user.email)) {
        error.$email = new Error(l18n.error_email_is_invalid);
        error.$length++;
    }
    if (!validations.password.test(user.password)) {
        error.$password = new Error(l18n.error_password_is_invalid);
        error.$length++;
    }
    if (confirm && user.password !== user.password_confirmation) {
        error.$password_confirmation = new Error(l18n.error_password_confirmation_is_invalid);
        error.$length++;
    }
    return error;
}

/**
 * El modelo
 */
export default class User {
    /**
     * el nombre
     */
    name = ''
    lastname = ''
    username = ''
    email = ''
    password = ''
    password_confirmation = ''
}
