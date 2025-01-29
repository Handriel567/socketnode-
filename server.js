const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

// Usar el puerto proporcionado por Railway o un valor predeterminado (8080)
const port = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port });
const clients = {};

wss.on('connection', (ws) => {
    const clientId = uuidv4();
    clients[clientId] = ws;

    console.log(`Cliente conectado: ${clientId}`);
    ws.send(JSON.stringify({ type: 'welcome', clientId }));

    ws.on('message', (message) => {
        try {
            const parsedMessage = JSON.parse(message);
            console.log('Mensaje recibido:', parsedMessage);

            const recipientId = parsedMessage.recipientId;
            console.log(recipientId);

            // Manejo de tipo 'text'
            if (parsedMessage.type === 'text') {
                if (clients[recipientId]) {
                    clients[recipientId].send(
                        JSON.stringify({
                            type: 'text',
                            senderId: clientId,
                            data: parsedMessage.data,
                        }),
                        (err) => {
                            if (err) {
                                console.error(`Error al enviar mensaje al cliente ${recipientId}:`, err);
                            }
                        }
                    );
                    console.log(`Texto enviado al cliente ${recipientId}`);
                } else {
                    console.log(`Destinatario ${recipientId} no encontrado.`);
                }
            }

            // Manejo de tipo 'photo'
            else if (parsedMessage.type === 'photo') {
                if (clients[recipientId]) {
                    clients[recipientId].send(
                        JSON.stringify({
                            type: 'photo',
                            senderId: clientId,
                            data: parsedMessage.data,
                        })
                    );
                    console.log(`Imagen enviada al cliente ${recipientId}`);
                } else {
                    console.log(`Destinatario ${recipientId} no encontrado.`);
                }
            }

            // Manejo de tipo 'audio'
            else if (parsedMessage.type === 'audio') {
                if (clients[recipientId]) {
                    clients[recipientId].send(
                        JSON.stringify({
                            type: 'audio',
                            senderId: clientId,
                            data: parsedMessage.data,
                        })
                    );
                    console.log(`Audio enviado al cliente ${recipientId}`);
                } else {
                    console.log(`Destinatario ${recipientId} no encontrado.`);
                }
            }

            // Manejo de tipo 'video'
            else if (parsedMessage.type === 'video') {
                if (clients[recipientId]) {
                    clients[recipientId].send(
                        JSON.stringify({
                            type: 'video',
                            senderId: clientId,
                            data: parsedMessage.data,
                        })
                    );
                    console.log(`Video enviado al cliente ${recipientId}`);
                } else {
                    console.log(`Destinatario ${recipientId} no encontrado.`);
                }
            }

        } catch (error) {
            console.error('Error procesando mensaje:', error);
        }
    });

    ws.on('close', () => {
        console.log(`Cliente desconectado: ${clientId}`);
        delete clients[clientId];
    });
});

console.log(`Servidor WebSocket escuchando en ws://localhost:${port}`);
