import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MarketTable from '../components/MarketTable';
import PortfolioTable from '../components/PortfolioTable';
import TransactionHistory from '../components/TransactionHistory';
import OrderForm from '../components/OrderForm';
import { useWebSocket } from '../hooks/useWebSocket';
import { portfolioService } from '../services/portfolio';
import { authService } from '../services/api';
import type { Stock, Portfolio, Transaction } from '../types';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { marketData, isConnected } = useWebSocket();
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | Portfolio | null>(null);
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [showOrderForm, setShowOrderForm] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [portfolioData, transactionsData] = await Promise.all([
        portfolioService.getPortfolio(),
        portfolioService.getTransactions()
      ]);
      setPortfolio(portfolioData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleBuy = (stock: Stock) => {
    setSelectedStock(stock);
    setOrderType('BUY');
    setShowOrderForm(true);
  };

  const handleSell = (item: Portfolio) => {
    setSelectedStock(item);
    setOrderType('SELL');
    setShowOrderForm(true);
  };

  const handleOrderSuccess = async () => {
    await loadData();
    // Refresh user data
    const updatedUser = await authService.getCurrentUser();
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.location.reload(); // Reload to update balance in navbar
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">Trading Dashboard</h1>
          <div className={`flex items-center ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            <span className={`h-3 w-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {isConnected ? 'Live Market Data' : 'Disconnected'}
          </div>
        </div>

        <div className="space-y-6">
          <MarketTable stocks={marketData} onBuy={handleBuy} />
          <PortfolioTable portfolio={portfolio} onSell={handleSell} />
          <TransactionHistory transactions={transactions} />
        </div>
      </div>

      {showOrderForm && (
        <OrderForm
          stock={selectedStock}
          orderType={orderType}
          onClose={() => setShowOrderForm(false)}
          onSuccess={handleOrderSuccess}
        />
      )}
    </div>
  );
};

export default Dashboard;
