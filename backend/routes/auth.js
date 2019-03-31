var express = require('express');
var router = express.Router();
var l18n = require('../l18n').default;
var mongoConnect = require('../db').connect;
var hash = require('../utils/hash');
var config = require('../config');
var UUID = require('uuid');
var redis = require('redis');

var { UserError, validate } = require('../models/user');

/**
 * 
 */
router.post('/register', async function (req, res) {
    var data = {
        name: req.body.name || '',
        lastname: req.body.lastname || '',
        username: req.body.username || '',
        email: req.body.email || '',
        password: req.body.password || '',
        created_at: new Date()
    };
    var client;
    try {
        const validations = await validate(data);
        if (validations.$length > 0) {
            res.status(401);
            res.json({
                success: false,
                errors: validations
            })
            return;
        }
        client = await mongoConnect();
    } catch (error) {
        console.trace(err);
        res.status(500);
        res.json({
            success: false,
            message: l18n.error_internal_server
        });
    }

    var conn = client.conn,
        db = client.db;

    try {
        const users = db.collection('users');
        data.password = hash(data.password);
        await users.insertOne(data);

        conn.close();

        res.status(201);
        res.json({
            success: true
        });
    } catch (error) {
        console.trace(err);
        res.status(500);
        res.json({
            success: false,
            message: l18n.error_internal_server
        });
        conn.close();
    }
});

router.post('/login', async function (req, res) {
    var user_data = {
        email: req.body.email || '',
        password: req.body.password || ''
    }

    let error = new UserError();
    if (user_data.email == '') {
        error.$email = l18n.error_email_is_required;
        error.$length++;
    }
    if (user_data.password == '') {
        error.$password = l18n.error_password_is_required;
        error.$length++;
    }

    user_data.password = hash(user_data.password);

    let client;
    try {
        client = await mongoConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
    }

    var conn = client.conn,
        db = client.db;
    try {
        const data = await db.collection('users').find(user_data).toArray();
        let token = UUID();
        let client = redis.createClient(config.sessions_storage);
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
                    name: data[0].name,
                    lastname: data[0].lastname,
                    username: data[0].username,
                    email: data[0].email
                }
            });
        });
        conn.close();
    } catch (err) {
        console.trace(err);
        res.status(500);
        res.json({
            success: false
        });
        conn.close();
    }
});

module.exports = router;
