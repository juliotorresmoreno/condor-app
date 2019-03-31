
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Language } from './template';

const lang: Language = {
    brand: 'WepaMessenger',
    loginLink: "Login",
    registerLink: 'Register',

    name: 'Name',
    lastname: 'Lastname',
    email: 'Email',
    username: 'Username',
    password: 'Password',
    password_confirm: 'Password Confirmation',

    registerButton: 'Sign up',
    loginButton: 'Sign in',
    logoutLink: 'Logout',

    error_name_is_invalid: 'The name is invalid',
    error_lastname_is_invalid: 'The lastname is invalid',
    error_username_is_invalid: 'The username is invalid',
    error_email_is_invalid: 'The email is invalid',
    error_password_is_invalid: 'The password is invalid, minimo 8 caracteres con mayusculas, minusculas y alguno de estos simbolos ! @ # $ % ^ & *',
    error_password_confirmation_is_invalid: 'The name is invalid',

    accept_terms_conditions: (
        <Fragment>
            Acepto los <Link target='blank' to='/terms_conditions'>terminos y condiciones</Link>
        </Fragment>
    ),

    terms_conditions_title: 'Terminos y Condiciones',

    terms_conditions_body: (
        <Fragment>
            <p>
                MIT License
    
                Copyright (c) Facebook, Inc. and its affiliates.
                
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
            </p>
        </Fragment>
    ),

    error_email_is_required: 'El email es obligatorio',

    add_user_form: 'Add user',

    profile_title: 'Profile',

    save_text: 'Save',

    cancel_text: 'Cancel',

    photo_tab_title: 'Photo',

    photo_tab_personal_info: 'Personal info',

    phone: 'Phone',

    description: 'Description'
}

export default lang;