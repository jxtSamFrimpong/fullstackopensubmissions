const http = require('http');
const socketIO = require('socket.io');
const axios = require('axios');

const server = http.createServer();
const io = socketIO(server);

// API Configuration
const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY';
const API_BASE_URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

io.on('connection', (socket) => {
    console.log('New WebSocket connection established.');

    socket.on('subscribe', (symbols) => {
        console.log(`Subscribed to symbols: ${symbols}`);

        // Fetch real-time data for each symbol
        symbols.forEach((symbol) => {
            fetchRealTimeData(symbol)
                .then((data) => {
                    socket.emit('data', data);
                })
                .catch((error) => {
                    console.error(`Error fetching data for ${symbol}: ${error}`);
                });
        });
    });

    socket.on('disconnect', () => {
        console.log('WebSocket connection closed.');
        // Additional cleanup or logic as needed
    });
});

async function fetchRealTimeData(symbol) {
    try {
        const response = await axios.get(API_BASE_URL);

        const data = response.data;
        return data;
    } catch (error) {
        throw error;
    }
}

server.listen(3000, () => {
    console.log('WebSocket server is listening on port 3000.');
});