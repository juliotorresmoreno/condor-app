
var l18n = require('../l18n').default;
var mongoConnect = require('../db').connect;

class UserError extends Error {
    constructor(props) {
        super(props);
        this.$length = 0;
    }
}

module.exports.UserError = UserError;

const validations = {
    name: /^([a-zA-Z]{3,}\s?){1,5}$/,
    lastname: /^([a-zA-Z]{3,}\s?){1,5}$/,
    username: /^[A-Za-z]([A-Za-z0-9_]){2,}$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
}

module.exports.validations = validations;

module.exports.validate = function (user = {}) {
    let error = new UserError();
    if (!validations.name.test(user.name || '')) {
        error.$name = l18n.error_name_is_invalid;
        error.$length++;
    }
    if (!validations.lastname.test(user.lastname || '')) {
        error.$lastname = l18n.error_lastname_is_invalid;
        error.$length++;
    }
    if (!validations.username.test(user.username || '')) {
        error.$username = l18n.error_username_is_invalid;
        error.$length++;
    }
    if (!validations.email.test(user.email || '')) {
        error.$email = l18n.error_email_is_invalid;
        error.$length++;
    }
    if (!validations.password.test(user.password || '')) {
        error.$password = l18n.error_password_is_invalid;
        error.$length++;
    }

    if (error.$length > 0) {
        return Promise.resolve(error);
    }

    return new Promise(function (resolve, reject) {
        mongoConnect()
            .then(function ({ conn, db }) {
                const users = db.collection('users');
                users.find({ $or: [{ email: user.email }, { username: user.username }] })
                    .toArray(function (err, data) {
                        conn.close();
                        if (err) {
                            reject(err);
                            return;
                        }
                        if (data.length > 0) {
                            if (data[0].email === user.email) {
                                error.$email = l18n.error_email_exists;
                                error.$length++;
                            }
                            if (data[0].username === user.username) {
                                error.$username = l18n.error_username_exists;
                                error.$length++;
                            }
                        }
                        resolve(error);
                    });
            })
            .catch(function (err) {
                return reject(err);
            });
    });
}
