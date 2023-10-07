const WebSocket = require('ws');
const jwt = require('jsonwebtoken');

const PORT = 8080;
const channels = {};

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws, req) => {
    // Code to handle new WebSocket connections

    const token = req.headers.authorization.split('Bearer ')[1];
    console.log('token', token)

    // Verify and decode JWT token
    //   jwt.verify(token, 'your_secret_key', (err, decoded) => {
    //     if (err) {
    //       // Handle authentication failure
    //       ws.close();
    //       return;
    //     }

    //     // Authentication successful
    //     // Handle further operations or channel assignment
    //   });

    // Join a specific channel
    const channel = 'general';
    if (!channels[channel]) {
        channels[channel] = [];
    }
    channels[channel].push(ws);

    // Send initial data to the client
    ws.send('Welcome to the WebSocket server!');

    ws.on('message', (message) => {
        // Handle incoming messages
        const deserializedData = JSON.parse(message);
        const data = { ...deserializedData, name: 'John', age: 25 };
        const serializedData = JSON.stringify(data);
        console.log('Received message:', message);

        // Send a message to the client that triggered the event
        ws.send(serializedData);

        // Broadcast a message to all connected clients
        channels[channel].forEach((client) => {
            client.send('Broadcast message!');
        });
    });

    wss.on('close', () => {
        // Code to handle client disconnection

        // Remove client from the channel
        channels[channel] = channels[channel].filter((client) => client !== ws);
    });

});

console.log(`WebSocket server is running... ${PORT}`);