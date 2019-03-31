

var config = require('../config');
var fs = require('fs');

function url_photo(username) {
    if (fs.existsSync(`${config.upload}/${username}/photo.png`)) {
        return `${config.upload_url}/static/${username}/photo.png?t=${Date.now()}`;
    }
    return '';
}

module.exports = url_photo;