const express = require('express');
const SocketServer = require('ws');
const PORT = process.env.port || 3001;
const app = express();

const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);

// Creating a new instance of the socket server
const wss = new SocketServer.Server({ server });
