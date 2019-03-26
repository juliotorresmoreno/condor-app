


const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', function connection(ws) {
    ws.send(JSON.stringify({
        type: '@chats/message',
        chatID: '1',
        userID: '12',
        text: 'Hola mundo'
    }))
});

function upgrade(request, socket, head) {
    if (/^\/ws\??.*/.test(request.url)) {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
}

module.exports = {
    upgrade
};