

export interface Language {
    brand: string
    registerLink: string
    loginLink: string

    name: string
    lastname: string
    email: string
    username: string
    password: string
    password_confirm: string

    registerButton: string
    loginButton: string
    logoutLink: string

    error_name_is_invalid: string
    error_lastname_is_invalid: string
    error_username_is_invalid: string
    error_email_is_invalid: string
    error_password_is_invalid: string
    error_password_confirmation_is_invalid: string

    accept_terms_conditions: string | JSX.Element

    terms_conditions_title: string

    terms_conditions_body: string | JSX.Element

    error_email_is_required: string

    add_user_form: string
}