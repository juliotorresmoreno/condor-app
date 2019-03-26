

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
var { connect: mongoConnect } = require('../db');

router.get('/', async function (req, res) {
    if (!req.session) {
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
        res.json({
            success: true,
            session: Object.assign(req.session, { chats: [] })
        });
        return
    }
    const { conn, db } = client;
    try {
        const query = {
            _id: { $in: req.session.chats.map(ObjectID) }
        }
        const chats = await db.collection('chats').find(query).toArray();
        const users = {};
        
        for (let i = 0; i < chats.length; i++) {
            const element = chats[i].users;
            for (let j = 0; j < element.length; j++) {
                if (req.session.username !== element[j])
                    users[element[j]] = true;
            }
        }

        const _users = await db.collection('users').find({
            username: { $in: Object.keys(users) }
        }).toArray();

        res.json({
            success: true,
            session: Object.assign({}, req.session, { chats }),
            users: _users.map(user => ({
                name: user.name,
                lastname: user.lastname,
                username: user.username
            }))
        });
        conn.close();
    } catch (error) {
        console.trace(error);
        res.json({
            success: true,
            session: Object.assign(req.session, { chats: [] })
        });
        conn.close();
        return
    }
});

module.exports = router;