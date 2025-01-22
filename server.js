const WebSocket = require('ws');
const PORT = process.env.PORT || 8080; // Usar el puerto de entorno o 8080 como predeterminado
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  
  // Enviar un mensaje al cliente
  ws.send('Hola desde el servidor');

  // Escuchar los mensajes del cliente
  ws.on('message', (message) => {
    console.log('Recibido: %s', message);
  });
});

console.log(`Servidor WebSocket corriendo en el puerto ${PORT}`);
