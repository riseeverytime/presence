const express = require('express');
const expressWs = require('express-ws');
const http = require('http');

const { isStringifiedJSON } = require('./helpers');
const { users } = require('./mock');

let port = 80;

let app = express();
let server = http.createServer(app).listen(port);

expressWs(app, server);

app.ws('/ws', async function (ws, req) {
  ws.on('message', async function (message) {
    if (isStringifiedJSON(message)) {
      message = JSON.parse(message);
    }

    if (typeof message === 'object') {
      if (message.type === 'subscribe') {
        let channel = message.payload;
        let payload = [];
        if (channel === 'channel 1') {
          payload = users.slice(0, 6);
        }
        if (channel === 'channel 2') {
          payload = users.slice(3);
        }
        let response = { channel: message.payload, type: 'userList', payload };
        ws.send(JSON.stringify(response));
      }
    }
  });
});
