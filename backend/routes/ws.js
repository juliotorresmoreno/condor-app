


const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });
const redis = require('redis');
const config = require('../config');
const session = require('../utils/session');
const url = require('url');
const UUID = require('uuid');

const pub = redis.createClient(config.sessions_storage);
const sub = redis.createClient(config.sessions_storage);

const channel = 'chats';

sub.on("subscribe", function (channel) {
    pub.publish(channel, JSON.stringify({
        type: '@test'
    }));
});

sub.on("message", function (channel, message) {
    const data = JSON.parse(message);
    switch (data.type) {
        case '@test':
            console.log("sub channel " + channel + ": test pub/sub");
            break;
        case '@send':
            const client = users_connected[data.data.dest];
            if (!client) return;
            Object.keys(client)
                .forEach(function (clientID) {
                    try {
                        client[clientID].send(JSON.stringify(data.data.message));
                    } catch (error) {
                        console.trace(error);
                        const tmp = client[clientID];
                        delete client[clientID];
                        tmp.close();
                    }
                });
            break;
        default:
            console.log(data);
            break;
    }
});

sub.subscribe(channel);

const send = function (from_user, dest_user, message) {
    pub.publish(channel, JSON.stringify({
        type: '@send',
        data: {
            from: from_user,
            dest: dest_user,
            message
        }
    }));
}

const users_connected = {};

wss.on('connection', function connection(ws) {

    if (!users_connected[ws.session.username]) {
        users_connected[ws.session.username] = {};
    }

    users_connected[ws.session.username][ws.clientID] = ws;

    ws.send(JSON.stringify({
        type: '@control/open'
    }));

    ws.on('close', function () {
        delete users_connected[ws.session.username][ws.clientID];
    });
});

const upgrade = async function (request, socket, head) {
    const parse_url = url.parse(request.url, true);

    if (parse_url.pathname === '/ws') {
        const token = parse_url.query.token;
        const _session = await session(token);

        if (session) {
            wss.handleUpgrade(request, socket, head, function done(ws) {
                ws.clientID = UUID();
                ws.session = _session;
                wss.emit('connection', ws, request);
            });
            return;
        }
    }
    socket.destroy();
}

module.exports = {
    upgrade, send
};