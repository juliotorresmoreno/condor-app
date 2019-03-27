
const ObjectID = require('mongodb').ObjectID;
const redis = require('redis');
const config = require('../config');
const mongoConnect = require('../db').connect;

module.exports = async function (token) {
    const redisClient = redis.createClient(config.sessions_storage);
    return await new Promise(function (resolve, reject) {
        redisClient.GET(token, async function (err, user_id) {

            redisClient.quit();

            if (err) return reject(err);

            if (!user_id) return resolve();

            const client = await mongoConnect();
            const { conn, db } = client;
            const data = await db.collection('users')
                .findOne({ _id: ObjectID(user_id) });
            conn.close();

            if (!data) return resolve();

            return resolve({
                _id: data._id,
                name: data.name,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
                chats: data.chats || []
            });
        });
    });
};