const express = require('express');
const SocketServer = require('ws');
const uuid = require('uuid/v4');
const PORT = process.env.port || 3001;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);

// Creating a new instance of the socket server
const wss = new SocketServer.Server({ server });

wss.broadcast = data => {
  wss.clients.forEach(client => {
    if (client.readyState === SocketServer.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', wsClient => {
  console.log('client is connected');

  // A message is sent by a client
  wsClient.on('message', msg => {
    const message = JSON.parse(msg);

    message.id = uuid().substr(2, 8);

    switch (message.type) {
      case 'postMessage':
        message.type = 'incomingMessage';
        break;
      case 'postNotification':
        message.type = 'incomingNotification';
        break;
      default:
        console.log('Unknown type of messages');
    }

    wss.broadcast(JSON.stringify(message));
  });

  wsClient.on('close', () => console.log('client is disconnected'));
});
