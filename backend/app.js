var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis = require('redis');
var config = require('./config');
var mongoConnect = require('./db').connect;
var ObjectID = require('mongodb').ObjectID;

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var chatsRouter = require('./routes/chats');
var sessionRouter = require('./routes/session');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.setHeader("Access-Control-Allow-Origin", '*')
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control,Authorization")
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }
    next();
});

app.use('/auth', authRouter);

app.use(function (req, res, next) {
    const token = req.headers.authorization;
    const redisClient = redis.createClient(config.sessions_storage);
    redisClient.GET(token, async function (err, user_id) {
        redisClient.quit();
        if (err && !user_id) {
            next();
            return;
        }
        var client;
        try {
            client = await mongoConnect();
        } catch (err) {
            console.trace(err);
            next();
        }
        const { conn, db } = client;

        db.collection('users')
            .findOne({ _id: ObjectID(user_id) }, function (err, data) {
                if (err) {
                    console.trace(err);
                    next();
                    return;
                }
                if (!data) {
                    next();
                    return;
                }

                req.session = {
                    _id: data._id,
                    name: data.name,
                    lastname: data.lastname,
                    username: data.username,
                    email: data.email,
                    chats: data.chats || []
                };

                next();
            });

        conn.close();
    });
});


app.use('/session', sessionRouter);

app.use(function (req, res, next) {
    if (req.headers.upgrade === 'websocket' || req.session) {
        next();
        return;
    }
    res.status(401);
    res.json({
        success: false,
        message: 'unauthorized'
    });
});


app.use('/users', usersRouter);
app.use('/chats', chatsRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
    res.status(404);
    res.json({ status: "Not found" })
});

// error handler
app.use(function (err, req, res, next) {
    // render the error page
    res.status(err.status || 500);
    res.json({
        status: 'Error',
        message: err.message
    });
});

module.exports = app;
