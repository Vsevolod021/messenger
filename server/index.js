const express = require('express');
const { WebSocketServer } = require('ws');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

const port = process.env.BACKEND_PORT;
const wss = new WebSocketServer({ port: process.env.WEBSOCKET_PORT });

const history = [];

const broadcastMessage = () => {
  const sendedHistory = [...history];
  sendedHistory.reverse();

  wss.clients.forEach((client) => client.send(JSON.stringify(sendedHistory)));
};

const messageHandler = (message) => {
  const parsedMessage = JSON.parse(message.toString());
  history.push(parsedMessage);

  broadcastMessage();
};

wss.on('connection', (ws) => {
  broadcastMessage();

  ws.on('message', messageHandler);
});

app.get('/', (_, res) => res.send('websocker server'));

app.listen(port, () => console.log(`server started at port ${port}`));
