const express = require('express');
const { WebSocketServer } = require('ws');

const app = express();
const port = 9000;

const wss = new WebSocketServer({ port: 8000 });

const history = [];

const broadcastMessage = () => {
  const sendedHistory = [...history];
  sendedHistory.reverse();

  wss.clients.forEach((client) => client.send(JSON.stringify(sendedHistory)));
};

const messageHandler = (message, ws) => {
  const parsedMessage = JSON.parse(message.toString());
  history.push(parsedMessage);

  broadcastMessage();
};

wss.on('connection', (ws) => {
  broadcastMessage();

  ws.on('message', (message) => messageHandler(message, ws));
});

app.get('/', (_, res) => res.send('websocker server'));

app.listen(port, () => console.log(`server started at port ${port}`));
