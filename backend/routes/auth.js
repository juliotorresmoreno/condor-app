var express = require('express');
var router = express.Router();
var l18n = require('../l18n').default;
var mongoConnect = require('../db').connect;
var hash = require('../utils/hash');
var config = require('../config');
var UUID = require('uuid');
var redis = require('redis');

class UserError extends Error {
    constructor(props) {
        super(props);
        this.$length = 0;
    }
}

const validations = {
    name: /^([a-zA-Z]{3,}\s?){1,5}$/,
    lastname: /^([a-zA-Z]{3,}\s?){1,5}$/,
    username: /^[A-Za-z]([A-Za-z0-9_]){2,}$/,
    email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
}

const validate = function (user = {}) {
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

/**
 * 
 */
router.post('/register', function (req, res, next) {
    var data = {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        created_at: new Date()
    };
    data = Object.assign(data, req.body);
    validate(data)
        .then(function (validations) {
            if (validations.$length > 0) {
                res.status(401);
                res.json({
                    success: false,
                    errors: validations
                })
                return;
            }
            mongoConnect()
                .then(function ({ conn, db }) {
                    const users = db.collection('users');
                    data.password = hash(data.password);
                    users.insertOne(data, function (err) {
                        conn.close();
                        if (err) {
                            console.trace(err);
                            res.status(500);
                            res.json({
                                success: false,
                                message: l18n.error_internal_server
                            })
                            return;
                        }
                        res.status(201);
                        res.json({
                            success: true
                        });
                    });
                })
                .catch(function (err) {
                    console.trace(err);
                    res.status(500);
                    res.json({
                        success: false,
                        message: l18n.error_internal_server
                    });
                });
        })
        .catch(function (err) {
            data.n
            console.trace(err);
            res.status(500);
            res.json({
                success: false,
                message: l18n.error_internal_server
            });
        });

});

router.post('/login', async function (req, res) {
    var data = {
        email: '',
        password: ''
    }
    data = Object.assign(data, req.body);

    let error = new UserError();
    if (data.email == '') {
        error.$email = l18n.error_email_is_required;
        error.$length++;
    }
    if (data.password == '') {
        error.$password = l18n.error_password_is_required;
        error.$length++;
    }

    data.password = hash(data.password);

    var conn, db;
    try {
        let client = await mongoConnect();
        conn = client.conn;
        db = client.db;

        db.collection('users').find(data).toArray(async function (err, data) {
            if (err) {
                res.json({
                    success: false,
                    message: l18n.error_auth
                });
                return;
            }
            var token = UUID();
            try {
                var client = redis.createClient(config.sessions_storage);
                client.SET(token, data[0]._id, function (err) {
                    client.quit();
                    if (err) {
                        console.trace(err);
                        res.status(500);
                        res.json({
                            success: false
                        });
                        return;
                    }
                    res.json({
                        success: true,
                        data: {
                            token: token,
                            username: data[0].username,
                            name: data[0].name,
                            lastname: data[0].lastname,
                            email: data[0].email
                        }
                    });
                });
            } catch (err) {
                console.trace(err);
                res.status(500);
                res.json({
                    success: false
                });
            }
        });
    } catch (err) {
        console.trace(err);
        res.status(500);
        res.json({
            success: false
        });
    } finally {
        conn.close();
    }
});

module.exports = router;
