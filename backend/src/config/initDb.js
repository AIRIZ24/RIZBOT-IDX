const pool = require('./database');

const initDb = async () => {
  try {
    console.log('Initializing database...');

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        balance DECIMAL(15, 2) DEFAULT 10000.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create portfolios table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolios (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        symbol VARCHAR(10) NOT NULL,
        quantity INTEGER NOT NULL,
        average_price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, symbol)
      )
    `);

    // Create transactions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS transactions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        symbol VARCHAR(10) NOT NULL,
        type VARCHAR(4) NOT NULL CHECK (type IN ('BUY', 'SELL')),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        total_amount DECIMAL(15, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create market_data table (for mock data)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS market_data (
        id SERIAL PRIMARY KEY,
        symbol VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        current_price DECIMAL(10, 2) NOT NULL,
        change_percent DECIMAL(5, 2) DEFAULT 0.00,
        volume BIGINT DEFAULT 0,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample market data
    await pool.query(`
      INSERT INTO market_data (symbol, name, current_price, change_percent, volume)
      VALUES 
        ('AAPL', 'Apple Inc.', 150.00, 2.5, 50000000),
        ('GOOGL', 'Alphabet Inc.', 140.00, -1.2, 30000000),
        ('MSFT', 'Microsoft Corp.', 380.00, 1.8, 25000000),
        ('TSLA', 'Tesla Inc.', 250.00, 5.3, 80000000),
        ('AMZN', 'Amazon.com Inc.', 145.00, 0.7, 40000000)
      ON CONFLICT (symbol) DO NOTHING
    `);

    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization error:', error);
    process.exit(1);
  }
};

initDb();
