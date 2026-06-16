const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  ws.username = null;

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'setUsername') {
        ws.username = data.username;
        console.log(`${ws.username} se conectó`);

        // Confirmar al cliente que el username fue asignado
        ws.send(JSON.stringify({
          type: 'usernameSet',
          username: ws.username
        }));

        // Notificar a todos que alguien se conectó
        const evento = {
          type: 'userJoined',
          username: ws.username
        };

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN && client !== ws) {
            client.send(JSON.stringify(evento));
          }
        });
      } else if (data.type === 'chat') {
        if (!ws.username) {
          console.error('Chat recibido sin username asignado');
          return;
        }

        console.log(`${ws.username}: ${data.text}`);

        // Enviar a todos los clientes
        const chatMessage = {
          type: 'chat',
          username: ws.username,
          text: data.text
        };

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(chatMessage));
          }
        });
      }
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
    }
  });

  ws.on('close', () => {
    if (ws.username) {
      console.log(`${ws.username} se desconectó`);

      // Notificar a todos que alguien se desconectó
      const evento = {
        type: 'userLeft',
        username: ws.username
      };

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(evento));
        }
      });
    }
  });

  ws.on('error', (error) => {
    console.error('Error:', error);
  });
});

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`WebSocket en ws://localhost:${PORT}`);
});
