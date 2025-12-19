# RIZBOT Trading Backend

Node.js + Express backend with PostgreSQL database and WebSocket support.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` and set your PostgreSQL credentials and JWT secret.

3. Initialize database:
```bash
npm run init-db
```

4. Start server:
```bash
npm run dev  # Development with nodemon
npm start    # Production
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Trading
- `GET /api/portfolio` - Get user portfolio (protected)
- `GET /api/transactions` - Get transaction history (protected)
- `POST /api/order` - Place order (protected)

### Market
- `GET /api/market` - Get all stocks
- `GET /api/market/:symbol` - Get specific stock

## WebSocket

WebSocket server runs on the same port as HTTP server. Connect to `ws://localhost:5000` to receive real-time market updates.

## Database Schema

See SETUP.md in the root directory for detailed schema information.
