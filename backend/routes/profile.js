


var express = require('express');
var ObjectID = require('mongodb').ObjectID;
var router = express.Router();
var config = require('../config');
var l18n = require('../l18n').default;
var mongoConnect = require('../db').connect;
var multer = require('multer');
var upload = multer({ dest: '/tmp' })
var fs = require('fs');

router.post('/', async function (req, res) {
    var data = {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        description: req.body.description
    };

    var client;

    try {
        client = await mongoConnect();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
    }

    const { conn, db } = client;

    try {
        await db.collection('users').updateOne({ _id: ObjectID(req.session._id) }, {
            $set: data
        });
        res.json({
            success: true
        });
        conn.close();
    } catch (error) {
        console.trace(error);
        res.status(500);
        res.json({
            success: false
        });
        conn.close();
    }
});

router.post('/photo', upload.single('photo'), function (req, res) {
    try {
        const user_path = `${config.upload}/${req.session.username}`;
        if (!fs.existsSync(user_path))
            fs.mkdirSync(user_path);

        fs.copyFileSync(req.file.path, `${user_path}/photo.png`);
        
        res.json({
            success: true
        });
    } catch (error) {
        console.trace(error);
    }
});

module.exports = router;