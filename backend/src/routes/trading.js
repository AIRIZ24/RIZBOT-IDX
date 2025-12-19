const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/auth');

router.get('/portfolio', authMiddleware, portfolioController.getPortfolio);
router.get('/transactions', authMiddleware, portfolioController.getTransactions);
router.post('/order', authMiddleware, portfolioController.placeOrder);

module.exports = router;
