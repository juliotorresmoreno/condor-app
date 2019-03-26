
var config = require('../config');
var MongoClient = require('mongodb').MongoClient;

module.exports = {
    connect: function () {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(config.dsn, function (err, client) {
                if (err) return reject(err);
                resolve({
                    conn: client,
                    db: client.db(client.s.options.dbName)
                });
            })
        });
    },
    chat_connect: function () {
        return new Promise(function (resolve, reject) {
            MongoClient.connect(config.chat_dsn, function (err, client) {
                if (err) return reject(err);
                resolve({
                    conn: client,
                    db: client.db(client.s.options.dbName)
                });
            })
        });
    }
}