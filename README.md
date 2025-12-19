# RIZBOT Trading Platform 📈

A full-stack trading web application with real-time market data, portfolio management, and transaction tracking.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

## 🚀 Features

- ✅ User authentication with JWT
- ✅ Real-time market data via WebSocket
- ✅ Portfolio tracker with profit/loss calculation
- ✅ Buy/sell order execution
- ✅ Transaction history
- ✅ Responsive design with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ PostgreSQL database

## 🛠️ Tech Stack

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS
- React Router
- Axios
- WebSocket Client

**Backend:**
- Node.js + Express
- PostgreSQL
- JWT Authentication
- WebSocket Server
- bcrypt

## 📦 Quick Start

See [SETUP.md](./SETUP.md) for detailed installation instructions.

### Prerequisites
- Node.js v14+
- PostgreSQL v12+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AIRIZ24/RIZBOT-IDX.git
   cd RIZBOT-IDX
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database credentials
   npm run init-db
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm start
   ```

4. **Access the app**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📖 Documentation

- [Setup Guide](./SETUP.md) - Detailed installation and configuration
- API Documentation - See SETUP.md for API endpoints
- Database Schema - See SETUP.md for database structure

## 🎯 Usage

1. Register a new account
2. Login with your credentials
3. View real-time market data
4. Buy stocks from the market
5. Track your portfolio performance
6. Sell stocks when profitable
7. Review transaction history

## 🔒 Security

- Passwords hashed with bcrypt
- JWT token authentication
- SQL injection protection
- CORS enabled
- Environment variables for sensitive data

## 📁 Project Structure

```
RIZBOT-IDX/
├── backend/          # Node.js + Express backend
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── controllers/ # Route controllers
│   │   ├── middleware/  # Authentication middleware
│   │   ├── routes/      # API routes
│   │   └── server.js    # Main server file
│   └── package.json
│
├── frontend/         # React + TypeScript frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── hooks/       # Custom hooks
│   │   └── types/       # TypeScript types
│   └── package.json
│
└── SETUP.md         # Detailed setup guide
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 👨‍💻 Author

**AIRIZ24**

## 📞 Support

For support and questions:
- Open an issue in the repository
- Email: support@rizbot.com

---

**Belajar trading jadi mudah!** Web kami menyediakan panduan step-by-step, akun demo gratis, dan dukungan 24/7. Cocok untuk pemula hingga trader profesional.
