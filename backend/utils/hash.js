
var crypto = require('crypto');
var l18n = require('../l18n').default;
var config = require('../config');

module.exports = function (content) {
    return crypto.createHash('sha256')
        .update(new Buffer(content, 'utf8'))
        .update(new Buffer(config.phrase, 'utf8'))
        .digest()
        .base64Slice();
}