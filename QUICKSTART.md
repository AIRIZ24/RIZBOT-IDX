# Quick Start Guide

This guide will help you get RIZBOT Trading Platform up and running in minutes.

## Using Docker (Recommended)

The fastest way to run the entire application:

```bash
# 1. Clone the repository
git clone https://github.com/AIRIZ24/RIZBOT-IDX.git
cd RIZBOT-IDX

# 2. Start all services
docker-compose up -d

# 3. Wait about 30 seconds for the database to initialize

# 4. Open your browser
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000/api/health
```

That's it! The app is now running with:
- PostgreSQL database with sample data
- Backend API server
- Frontend React app
- Real-time WebSocket connection

### Stopping the Application

```bash
docker-compose down
```

## Manual Setup (Without Docker)

### Prerequisites
- Node.js v14+
- PostgreSQL v12+

### Quick Steps

```bash
# 1. Clone and navigate
git clone https://github.com/AIRIZ24/RIZBOT-IDX.git
cd RIZBOT-IDX

# 2. Run setup script
chmod +x setup.sh
./setup.sh

# 3. Configure backend/.env with your database credentials

# 4. Initialize database
cd backend
npm run init-db

# 5. Start backend (in one terminal)
npm run dev

# 6. Start frontend (in another terminal)
cd ../frontend
npm start
```

## First Steps in the App

1. **Register**: Create a new account at http://localhost:3000/register
   - Use any email (e.g., test@example.com)
   - Choose a username
   - Create a password

2. **Login**: Sign in with your credentials

3. **Dashboard**: You'll see:
   - Real-time market data for 5 stocks (AAPL, GOOGL, MSFT, TSLA, AMZN)
   - Your starting balance: $10,000
   - Empty portfolio (no holdings yet)
   - Empty transaction history

4. **Buy Your First Stock**:
   - Click "Trade" on any stock
   - Enter quantity
   - Click "BUY"
   - Watch your balance decrease and portfolio update

5. **Monitor Performance**:
   - See real-time price changes (updates every 5 seconds)
   - Watch your profit/loss percentage change
   - View your transaction history

6. **Sell Stocks**:
   - Click "Sell" on any portfolio item
   - Enter quantity
   - Click "SELL"
   - Watch your balance increase

## Troubleshooting

### Database Connection Error
```bash
# Make sure PostgreSQL is running
# For Docker: docker-compose ps
# For local: systemctl status postgresql (Linux) or brew services list (macOS)

# Check backend/.env has correct DB credentials
```

### Port Already in Use
```bash
# If port 5000 or 3000 is already in use, change it in:
# - backend/.env (PORT=5001)
# - frontend/.env (REACT_APP_API_URL=http://localhost:5001/api)
```

### WebSocket Not Connecting
```bash
# Make sure both frontend and backend URLs are correctly set
# Check browser console for connection errors
# Ensure backend is running before frontend
```

## Default Credentials (for testing)

After running the app, register a new user. There are no pre-configured users for security reasons.

## Sample Stocks

The database comes pre-loaded with:
- AAPL - Apple Inc.
- GOOGL - Alphabet Inc.
- MSFT - Microsoft Corp.
- TSLA - Tesla Inc.
- AMZN - Amazon.com Inc.

Prices fluctuate automatically between -3% and +3% every 5 seconds to simulate a real market.

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed configuration options
- Check [README.md](./README.md) for architecture overview
- Explore the API at http://localhost:5000/api/health

## Support

Having issues? 
- Check the logs: `docker-compose logs -f` (Docker) or terminal output (manual setup)
- Open an issue on GitHub
- Review the detailed SETUP.md guide

Happy Trading! 📈
