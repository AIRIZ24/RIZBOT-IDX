const pool = require('../config/database');

// Get all market data
exports.getMarketData = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM market_data ORDER BY symbol'
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get specific symbol
exports.getSymbol = async (req, res) => {
  try {
    const { symbol } = req.params;

    const result = await pool.query(
      'SELECT * FROM market_data WHERE symbol = $1',
      [symbol]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Symbol not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update market data (for simulation)
exports.updateMarketData = async () => {
  try {
    const result = await pool.query('SELECT * FROM market_data');
    const stocks = result.rows;

    for (const stock of stocks) {
      const currentPrice = parseFloat(stock.current_price);
      
      // Random price change between -3% and +3%
      const changePercent = parseFloat((Math.random() * 6 - 3).toFixed(2));
      const priceChange = (currentPrice * changePercent) / 100;
      const newPrice = (currentPrice + priceChange).toFixed(2);

      await pool.query(
        'UPDATE market_data SET current_price = $1, change_percent = $2, updated_at = CURRENT_TIMESTAMP WHERE symbol = $3',
        [newPrice, changePercent, stock.symbol]
      );
    }

    return await pool.query('SELECT * FROM market_data ORDER BY symbol');
  } catch (error) {
    console.error('Market update error:', error);
    throw error;
  }
};
