const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const tradingRoutes = require('./routes/trading');
const marketRoutes = require('./routes/market');
const marketController = require('./controllers/marketController');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', tradingRoutes);
app.use('/api', marketRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'RIZBOT Trading API is running' });
});

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('New WebSocket client connected');

  ws.on('message', (message) => {
    console.log('Received:', message.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Broadcast market data to all connected clients
const broadcastMarketData = async () => {
  try {
    const result = await marketController.updateMarketData();
    const marketData = result.rows;

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'MARKET_UPDATE',
          data: marketData
        }));
      }
    });
  } catch (error) {
    console.error('Broadcast error:', error);
  }
};

// Update market data every 5 seconds
setInterval(broadcastMarketData, 5000);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`WebSocket server ready`);
});
