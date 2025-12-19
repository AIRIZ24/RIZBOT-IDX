# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Register User

**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Response:** `201 Created`
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "balance": 10000.00
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `400` - Email or username already exists
- `400` - Missing required fields

---

### Login User

**POST** `/auth/login`

Authenticate and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "username": "johndoe",
    "balance": 10000.00
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- `401` - Invalid credentials
- `400` - Missing required fields

---

### Get Current User

**GET** `/auth/me`

Get the currently authenticated user's information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "email": "user@example.com",
  "username": "johndoe",
  "balance": 9500.00
}
```

**Errors:**
- `401` - Invalid or missing token
- `404` - User not found

---

## Market Data

### Get All Stocks

**GET** `/market`

Get all available stocks with current prices.

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "current_price": 150.25,
    "change_percent": 2.35,
    "volume": 50000000,
    "updated_at": "2024-01-01T12:00:00.000Z"
  },
  {
    "id": 2,
    "symbol": "GOOGL",
    "name": "Alphabet Inc.",
    "current_price": 140.50,
    "change_percent": -1.20,
    "volume": 30000000,
    "updated_at": "2024-01-01T12:00:00.000Z"
  }
]
```

---

### Get Stock by Symbol

**GET** `/market/:symbol`

Get details for a specific stock.

**Parameters:**
- `symbol` - Stock symbol (e.g., AAPL)

**Response:** `200 OK`
```json
{
  "id": 1,
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "current_price": 150.25,
  "change_percent": 2.35,
  "volume": 50000000,
  "updated_at": "2024-01-01T12:00:00.000Z"
}
```

**Errors:**
- `404` - Symbol not found

---

## Portfolio Management

### Get User Portfolio

**GET** `/portfolio`

Get the current user's portfolio holdings.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "quantity": 10,
    "average_price": 145.00,
    "current_price": 150.25,
    "current_value": 1502.50,
    "profit_loss_percent": 3.62,
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  }
]
```

**Errors:**
- `401` - Invalid or missing token

---

### Get Transaction History

**GET** `/transactions`

Get the current user's transaction history (last 50 transactions).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "type": "BUY",
    "quantity": 10,
    "price": 145.00,
    "total_amount": 1450.00,
    "created_at": "2024-01-01T10:00:00.000Z"
  },
  {
    "id": 2,
    "user_id": 1,
    "symbol": "GOOGL",
    "name": "Alphabet Inc.",
    "type": "SELL",
    "quantity": 5,
    "price": 142.00,
    "total_amount": 710.00,
    "created_at": "2024-01-01T11:00:00.000Z"
  }
]
```

**Errors:**
- `401` - Invalid or missing token

---

### Place Order

**POST** `/order`

Execute a buy or sell order.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "symbol": "AAPL",
  "type": "BUY",
  "quantity": 10,
  "price": 150.25
}
```

**Fields:**
- `symbol` (string, required) - Stock symbol
- `type` (string, required) - "BUY" or "SELL"
- `quantity` (number, required) - Number of shares (must be positive)
- `price` (number, required) - Price per share

**Response:** `200 OK`
```json
{
  "message": "Order placed successfully",
  "type": "BUY",
  "symbol": "AAPL",
  "quantity": 10,
  "price": 150.25,
  "totalAmount": 1502.50
}
```

**Errors:**
- `400` - Insufficient balance (for BUY orders)
- `400` - Insufficient shares (for SELL orders)
- `400` - Invalid order type
- `400` - Missing required fields
- `401` - Invalid or missing token

---

## WebSocket

**URL:** `ws://localhost:5000`

The WebSocket connection provides real-time market data updates.

### Connection

```javascript
const ws = new WebSocket('ws://localhost:5000');

ws.onopen = () => {
  console.log('Connected to market data feed');
};

ws.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log('Market update:', message);
};
```

### Messages

**Market Update (Server → Client)**

Sent every 5 seconds with updated stock prices.

```json
{
  "type": "MARKET_UPDATE",
  "data": [
    {
      "id": 1,
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "current_price": 150.75,
      "change_percent": 2.80,
      "volume": 50500000,
      "updated_at": "2024-01-01T12:00:05.000Z"
    }
  ]
}
```

---

## Status Codes

- `200` - Success
- `201` - Created (successful registration)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing or invalid token)
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently, no rate limiting is implemented. Consider adding rate limiting in production.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Error Response Format

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

## Examples

### Complete Trading Flow

1. **Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"trader@example.com","username":"trader1","password":"pass123"}'
```

2. **Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"trader@example.com","password":"pass123"}'
```

3. **Get Market Data:**
```bash
curl http://localhost:5000/api/market
```

4. **Buy Stock:**
```bash
curl -X POST http://localhost:5000/api/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"symbol":"AAPL","type":"BUY","quantity":10,"price":150.00}'
```

5. **Check Portfolio:**
```bash
curl http://localhost:5000/api/portfolio \
  -H "Authorization: Bearer YOUR_TOKEN"
```

6. **Sell Stock:**
```bash
curl -X POST http://localhost:5000/api/order \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"symbol":"AAPL","type":"SELL","quantity":5,"price":152.00}'
```

7. **View Transactions:**
```bash
curl http://localhost:5000/api/transactions \
  -H "Authorization: Bearer YOUR_TOKEN"
```
