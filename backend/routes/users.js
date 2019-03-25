

var express = require('express');
var router = express.Router();
var mongoConnect = require('../db').connect;

/* GET users listing. */
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

    const c = new RegExp(`${q}`, 'i');
    const query = {
        $or: [
            { name: c },
            { lastname: c },
            { username: c },
            { email: c }
        ]
    }

    db.collection("users").find(query)
        .toArray(function (err, data) {
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

module.exports = router;
