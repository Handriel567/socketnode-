const WebSocket = require('ws');
const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

// Objeto para almacenar los usuarios conectados con su ID
const clients = {};

// Función para generar un ID único para cada cliente
function generateClientId() {
  return Math.random().toString(36).substr(2, 9);  // Genera un ID único
}

wss.on('connection', (ws) => {
  const clientId = generateClientId();  // Asignar un ID único al cliente
  console.log(`Cliente conectado con ID: ${clientId}`);

  // Almacenar al cliente en el objeto clients con su ID
  clients[clientId] = ws;

  // Enviar el ID al cliente para que lo pueda usar
  ws.send(JSON.stringify({ type: 'ID', id: clientId }));

  // Escuchar los mensajes del cliente
  ws.on('message', (message) => {
    console.log('Recibido: %s', message);

    // Enviar un mensaje a otro cliente por su ID
    const parsedMessage = JSON.parse(message);
    if (parsedMessage.type === 'message' && parsedMessage.to && clients[parsedMessage.to]) {
      const targetClient = clients[parsedMessage.to];
      targetClient.send(`Mensaje de ${clientId}: ${parsedMessage.text}`);
    }
  });

  // Eliminar al cliente de la lista cuando se desconecte
  ws.on('close', () => {
    delete clients[clientId];
    console.log(`Cliente con ID ${clientId} desconectado`);
  });
});

console.log(`Servidor WebSocket corriendo en el puerto ${PORT}`);
