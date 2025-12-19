# RIZBOT Trading Frontend

React + TypeScript frontend with Tailwind CSS.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` if your backend URL is different from the default.

3. Start development server:
```bash
npm start
```

4. Build for production:
```bash
npm run build
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page-level components
- `src/services/` - API service functions
- `src/hooks/` - Custom React hooks
- `src/types/` - TypeScript type definitions

## Features

- JWT authentication
- Real-time WebSocket updates
- Responsive design
- Type-safe with TypeScript
- Tailwind CSS styling
