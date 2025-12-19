#!/bin/bash

echo "🚀 RIZBOT Trading Platform Setup"
echo "================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed. Please install PostgreSQL v12 or higher."
    echo "   You can also use Docker: docker-compose up -d postgres"
fi

echo ""
echo "📦 Installing Backend Dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
echo "✅ Backend dependencies installed"

# Create .env from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your database credentials"
fi

cd ..

echo ""
echo "📦 Installing Frontend Dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
echo "✅ Frontend dependencies installed"

# Create .env from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating frontend .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Configure backend/.env with your PostgreSQL credentials"
echo "2. Run 'cd backend && npm run init-db' to initialize the database"
echo "3. Run 'cd backend && npm run dev' to start the backend server"
echo "4. Run 'cd frontend && npm start' to start the frontend app"
echo ""
echo "Or use Docker: docker-compose up"
echo ""
echo "Happy Trading! 📈"
