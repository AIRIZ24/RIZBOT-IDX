const pool = require('../config/database');

// Get portfolio
exports.getPortfolio = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.*, m.current_price, m.name,
        (p.quantity * m.current_price) as current_value,
        ((m.current_price - p.average_price) / p.average_price * 100) as profit_loss_percent
       FROM portfolios p
       JOIN market_data m ON p.symbol = m.symbol
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get transactions
exports.getTransactions = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT t.*, m.name
       FROM transactions t
       JOIN market_data m ON t.symbol = m.symbol
       WHERE t.user_id = $1
       ORDER BY t.created_at DESC
       LIMIT 50`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Place order (buy/sell)
exports.placeOrder = async (req, res) => {
  const client = await pool.connect();

  try {
    const { symbol, type, quantity, price } = req.body;

    if (!symbol || !type || !quantity || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['BUY', 'SELL'].includes(type.toUpperCase())) {
      return res.status(400).json({ error: 'Type must be BUY or SELL' });
    }

    if (quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be positive' });
    }

    const totalAmount = quantity * price;

    await client.query('BEGIN');

    // Get user balance
    const userResult = await client.query(
      'SELECT balance FROM users WHERE id = $1',
      [req.user.id]
    );
    const currentBalance = parseFloat(userResult.rows[0].balance);

    if (type.toUpperCase() === 'BUY') {
      // Check if user has enough balance
      if (currentBalance < totalAmount) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Insufficient balance' });
      }

      // Update user balance
      await client.query(
        'UPDATE users SET balance = balance - $1 WHERE id = $2',
        [totalAmount, req.user.id]
      );

      // Update or insert portfolio
      const portfolioResult = await client.query(
        'SELECT * FROM portfolios WHERE user_id = $1 AND symbol = $2',
        [req.user.id, symbol]
      );

      if (portfolioResult.rows.length > 0) {
        const existing = portfolioResult.rows[0];
        const newQuantity = existing.quantity + quantity;
        const newAveragePrice = ((existing.quantity * existing.average_price) + totalAmount) / newQuantity;

        await client.query(
          'UPDATE portfolios SET quantity = $1, average_price = $2, updated_at = CURRENT_TIMESTAMP WHERE user_id = $3 AND symbol = $4',
          [newQuantity, newAveragePrice, req.user.id, symbol]
        );
      } else {
        await client.query(
          'INSERT INTO portfolios (user_id, symbol, quantity, average_price) VALUES ($1, $2, $3, $4)',
          [req.user.id, symbol, quantity, price]
        );
      }
    } else {
      // SELL
      const portfolioResult = await client.query(
        'SELECT * FROM portfolios WHERE user_id = $1 AND symbol = $2',
        [req.user.id, symbol]
      );

      if (portfolioResult.rows.length === 0 || portfolioResult.rows[0].quantity < quantity) {
        await client.query('ROLLBACK');
        return res.status(400).json({ error: 'Insufficient shares to sell' });
      }

      // Update user balance
      await client.query(
        'UPDATE users SET balance = balance + $1 WHERE id = $2',
        [totalAmount, req.user.id]
      );

      // Update portfolio
      const newQuantity = portfolioResult.rows[0].quantity - quantity;
      if (newQuantity === 0) {
        await client.query(
          'DELETE FROM portfolios WHERE user_id = $1 AND symbol = $2',
          [req.user.id, symbol]
        );
      } else {
        await client.query(
          'UPDATE portfolios SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE user_id = $2 AND symbol = $3',
          [newQuantity, req.user.id, symbol]
        );
      }
    }

    // Record transaction
    await client.query(
      'INSERT INTO transactions (user_id, symbol, type, quantity, price, total_amount) VALUES ($1, $2, $3, $4, $5, $6)',
      [req.user.id, symbol, type.toUpperCase(), quantity, price, totalAmount]
    );

    await client.query('COMMIT');

    res.json({ message: 'Order placed successfully', type: type.toUpperCase(), symbol, quantity, price, totalAmount });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Order error:', error);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
};
