

var NODE_ENV = process.env.NODE_ENV;

var config = {
    "dsn": "",
    "chat_dsn": "",
    "phrase": "",
    "sessions_storage": {},
    "upload": "",
    "upload_url": ""
};

if (NODE_ENV === 'production') {
    config = Object.assign(config, require('./production.json'));
} else {
    config = Object.assign(config, require('./development.json'));
}

module.exports = config;

