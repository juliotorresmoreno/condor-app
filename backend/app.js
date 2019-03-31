var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('./utils/session');

var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
var chatsRouter = require('./routes/chats');
var sessionRouter = require('./routes/session');
var profileRouter = require('./routes/profile');
var staticRouter = require('./routes/static');

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

app.use('/static', staticRouter);

app.use(async function (req, res, next) {
    try {
        const token = req.headers.authorization;
        req.session = await session(token);
    } catch (error) {
        console.trace(error);
    }
    next();
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
app.use('/profile', profileRouter);

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
