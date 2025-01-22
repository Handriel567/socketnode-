const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  // Enviar un mensaje al cliente
  ws.send('Hola desde el servidor');

  // Escuchar los mensajes del cliente
  ws.on('message', (message) => {
    console.log('Recibido: %s', message);
  });
});

console.log('Servidor WebSocket corriendo en ws://localhost:8080');
