

var express = require('express');
var router = express.Router();
var { connect: mongoConnect, chat_connect: chatConnect } = require('../db');
var ObjectID = require('mongodb').ObjectID;
var send = require('../routes/ws').send;

/* GET chats listing. */
router.get('/', async function (req, res, next) {
    let q = req.query.q || '';
    let client;
    try {
        client = await mongoConnect();
    } catch (err) {
        console.trace(err);
        res.status(500);
        res.json({
            success: false
        })
        return;
    }
    const { conn, db } = client;

    const query = {

    }

    db.collection("chats").find(query)
        .toArray(function (err, data) {
            conn.close();
            if (err) {
                console.trace(err);
                res.status(500);
                res.json({
                    success: false
                })
                return;
            }
            res.json({
                success: true,
                data: data
            });
        });
});

router.put('/', async function (req, res) {
    var data = { user: '' }
    Object.assign(data, req.body);

    const session = req.session;

    var client;
    try {
        client = await mongoConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        })
        return;
    }

    const { db, conn } = client;

    try {
        const query = {
            $and: [
                { users: { $size: 2 } },
                { users: { $in: [req.session.username] } },
                { users: { $in: [data.user] } }
            ]
        };
        const _chats = await db.collection("chats").find(query).toArray();

        if (_chats.length) {
            res.json({
                success: true,
                chatID: _chats[0]._id
            });
            conn.close();
            return;
        }

        const row = await db.collection('chats').insertOne({
            users: [session.username, data.user]
        });
        var chats = session.chats.slice(0);
        chats.push(row.insertedId);
        await db.collection('users').update(
            { _id: ObjectID(session._id) },
            { $set: { chats: chats } }
        );
        const user = await db.collection('users').findOne({ username: data.user });
        chats = (user.chats || []).slice(0);
        chats.push(row.insertedId);
        await db.collection('users').update(
            { _id: ObjectID(user._id) },
            { $set: { chats: chats } }
        );
        res.json({
            success: true,
            chatID: row.insertedId
        });
        conn.close();
        return;
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        conn.close();
        return;
    }
});

router.post('/:id', async function (req, res) {
    const chat_id = req.params.id;
    const text = req.body.text;
    var chat_client;
    try {
        chat_client = await chatConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        return;
    }

    var client;
    try {
        client = await mongoConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        return;
    }

    const { conn, db } = client;
    const { conn: conn_chat, db: db_chat } = chat_client;

    try {
        const chat = await db.collection('chats').findOne({ _id: ObjectID(chat_id) });
        if (chat && chat.users.includes(req.session.username)) {

            const message = {
                user: req.session.username,
                text: text,
                created_at: new Date()
            };
            const message_id = await db_chat.collection(`chat_${chat_id}`).insertOne(message);

            chat.users.forEach(function (username) {
                send(
                    req.session.username,
                    username,
                    {
                        type: '@chats/message',
                        chatID: chat_id,
                        message: {
                            _id: message_id.insertedId,
                            ...message
                        }
                    }
                )
            });

            res.json({
                success: true
            });

            conn.close();
            conn_chat.close();
            return;
        }

        res.status(401);
        res.json({
            success: false
        });

        conn.close();
        conn_chat.close();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        conn.close();
        conn_chat.close();
        return;
    }
});

router.put('/:id/append', async function (req, res) {
    const chat_id = req.params.id;
    const user = req.body.user || '';

    if (!user) {
        res.status(401);
        res.json({
            success: false
        });
        return;
    }

    var client;
    try {
        client = await mongoConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        return;
    }

    const { conn, db } = client;

    try {
        const query = { _id: ObjectID(chat_id) };
        const chat = await db.collection('chats').findOne(query);

        if (chat && chat.users.includes(req.session.username)) {
            const users = chat.users.slice(0);
            if (!users.includes(user)) {
                users.push(user);
                users.forEach(function (username) {
                    send(req.session.username, username, { type: '@chats/reload' });
                });
                await db.collection('chats').update(query, { $set: { users } });

                const _user = await db.collection('users').findOne({ username: user });
                _user.chats = _user.chats || [];
                _user.chats.push(ObjectID(chat_id));

                await db.collection('users').update({ username: user }, { $set: {
                    chats: _user.chats
                } });
            }

            res.json({ success: true });
            conn.close();
            return;
        }

        res.status(401);
        res.json({
            success: false
        });

        conn.close();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        conn.close();
        return;
    }
});

router.get('/:id', async function (req, res) {
    const chat_id = req.params.id;
    var chat_client;
    try {
        chat_client = await chatConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        return;
    }

    var client;
    try {
        client = await mongoConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        return;
    }

    const { conn, db } = client;
    const { conn: conn_chat, db: db_chat } = chat_client;

    try {
        const chat = await db.collection('chats').findOne({ _id: ObjectID(chat_id) });
        if (chat && chat.users.includes(req.session.username)) {

            const messages = await db_chat.collection(`chat_${chat_id}`)
                .find({})
                .sort({ created_at: -1 })
                .limit(20)
                .toArray();

            res.json({
                success: true,
                messages: messages.reverse()
            });

            conn.close();
            conn_chat.close();
            return;
        }

        res.status(401);
        res.json({
            success: false
        });

        conn.close();
        conn_chat.close();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        conn.close();
        conn_chat.close();
        return;
    }
});

module.exports = router;
