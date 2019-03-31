

var express = require('express');
var router = express.Router();
var config = require('../config');
var fs = require('fs');

router.get('/:username/photo.png', function (req, res) {
    try {
        const username = req.params.username || '';
        const file_path = `${config.upload}/${username}/photo.png`;
        if (fs.existsSync(file_path)) {
            fs.readFile(file_path, function (err, data) {
                if (err) {
                    res.status(404);
                    res.end();
                    return;
                }
                res.end(data);
            });
            return;
        }
        res.status(404);
        res.end();
    } catch (error) {
        console.trace(error);
        res.status(404);
        res.end();
    }
});

module.exports = router;

