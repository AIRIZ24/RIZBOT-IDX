# RIZBOT Trading Platform

A full-stack trading web application built with React, TypeScript, Node.js, Express, and PostgreSQL.

## Features

- 🔐 **User Authentication**: JWT-based authentication system
- 📊 **Real-time Market Data**: Live stock prices via WebSocket
- 💼 **Portfolio Tracker**: Track your holdings and performance
- 📈 **Buy/Sell Orders**: Execute trades with real-time updates
- 📝 **Transaction History**: View all your past trades
- 💰 **Virtual Balance**: Start with $10,000 demo money

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- WebSocket Client

### Backend
- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- WebSocket Server
- bcrypt for password hashing

## Project Structure

```
RIZBOT-IDX/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js       # Database connection
│   │   │   └── initDb.js         # Database initialization
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── portfolioController.js
│   │   │   └── marketController.js
│   │   ├── middleware/
│   │   │   └── auth.js           # JWT middleware
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── trading.js
│   │   │   └── market.js
│   │   └── server.js             # Main server file
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.tsx
    │   │   ├── MarketTable.tsx
    │   │   ├── PortfolioTable.tsx
    │   │   ├── TransactionHistory.tsx
    │   │   └── OrderForm.tsx
    │   ├── pages/
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   └── Dashboard.tsx
    │   ├── services/
    │   │   ├── api.ts
    │   │   ├── portfolio.ts
    │   │   └── market.ts
    │   ├── hooks/
    │   │   └── useWebSocket.ts
    │   ├── types/
    │   │   └── index.ts
    │   ├── App.tsx
    │   ├── index.tsx
    │   └── index.css
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.js
    └── .env.example
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/AIRIZ24/RIZBOT-IDX.git
cd RIZBOT-IDX
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your PostgreSQL credentials
# Important: Update DB_PASSWORD and JWT_SECRET

# Initialize the database
npm run init-db

# Start the backend server
npm run dev
```

The backend will run on http://localhost:5000

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Start the frontend development server
npm start
```

The frontend will run on http://localhost:3000

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=rizbot_trading
DB_USER=postgres
DB_PASSWORD=your_password_here

# JWT
JWT_SECRET=your_jwt_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d

# WebSocket
WS_PORT=8080
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000
```

## Database Schema

### Users Table
- id (SERIAL PRIMARY KEY)
- email (VARCHAR UNIQUE)
- username (VARCHAR UNIQUE)
- password_hash (VARCHAR)
- balance (DECIMAL, default 10000.00)
- created_at (TIMESTAMP)

### Portfolios Table
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER FOREIGN KEY)
- symbol (VARCHAR)
- quantity (INTEGER)
- average_price (DECIMAL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### Transactions Table
- id (SERIAL PRIMARY KEY)
- user_id (INTEGER FOREIGN KEY)
- symbol (VARCHAR)
- type (VARCHAR: 'BUY' or 'SELL')
- quantity (INTEGER)
- price (DECIMAL)
- total_amount (DECIMAL)
- created_at (TIMESTAMP)

### Market Data Table
- id (SERIAL PRIMARY KEY)
- symbol (VARCHAR UNIQUE)
- name (VARCHAR)
- current_price (DECIMAL)
- change_percent (DECIMAL)
- volume (BIGINT)
- updated_at (TIMESTAMP)

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Trading
- `GET /api/portfolio` - Get user portfolio (requires auth)
- `GET /api/transactions` - Get transaction history (requires auth)
- `POST /api/order` - Place buy/sell order (requires auth)

### Market
- `GET /api/market` - Get all market data
- `GET /api/market/:symbol` - Get specific stock data

## WebSocket

The WebSocket server broadcasts real-time market data updates every 5 seconds to all connected clients.

**Message Format:**
```json
{
  "type": "MARKET_UPDATE",
  "data": [
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "current_price": 150.00,
      "change_percent": 2.5,
      "volume": 50000000,
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Usage

1. **Register**: Create a new account with email, username, and password
2. **Login**: Sign in with your credentials
3. **View Market**: See live stock prices on the dashboard
4. **Buy Stocks**: Click "Trade" on any stock, enter quantity, and confirm
5. **View Portfolio**: See your holdings, current value, and profit/loss
6. **Sell Stocks**: Click "Sell" on portfolio items
7. **Transaction History**: View all past trades

## Features in Detail

### Authentication
- Secure password hashing with bcrypt
- JWT tokens with 7-day expiration
- Protected routes requiring authentication

### Real-time Market Data
- WebSocket connection for live updates
- Mock price fluctuations (-3% to +3%)
- Updates every 5 seconds
- Connection status indicator

### Portfolio Management
- Real-time portfolio value calculation
- Profit/loss tracking per holding
- Average price calculation for multiple buys

### Order Execution
- Buy/sell validation
- Balance checking
- Inventory verification for sells
- Transaction recording
- Atomic database operations

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development
```bash
cd frontend
npm start  # React development server with hot reload
```

### Building for Production

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

## Sample Data

The database initialization script includes 5 sample stocks:
- AAPL (Apple Inc.)
- GOOGL (Alphabet Inc.)
- MSFT (Microsoft Corp.)
- TSLA (Tesla Inc.)
- AMZN (Amazon.com Inc.)

Each new user starts with $10,000 virtual balance.

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- SQL injection protection (parameterized queries)
- CORS configuration
- Environment variable configuration
- Protected API routes

## Contributing

Feel free to submit issues and pull requests!

## License

MIT License

## Author

AIRIZ24

## Support

For support, email support@rizbot.com or open an issue in the repository.
