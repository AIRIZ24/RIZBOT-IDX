import React, { useState } from 'react';
import type { Stock, Portfolio } from '../types';
import { portfolioService } from '../services/portfolio';

interface OrderFormProps {
  stock: Stock | Portfolio | null;
  orderType: 'BUY' | 'SELL';
  onClose: () => void;
  onSuccess: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ stock, orderType, onClose, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!stock) return null;

  const price = 'current_price' in stock ? stock.current_price : stock.current_price;
  const symbol = stock.symbol;
  const name = stock.name;

  const totalAmount = quantity * price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await portfolioService.placeOrder({
        symbol,
        type: orderType,
        quantity,
        price
      });
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {orderType} {symbol}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-gray-600">{name}</p>
          <p className="text-xl font-semibold text-gray-800">
            ${price.toFixed(2)} per share
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              required
            />
          </div>

          <div className="mb-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total Amount:</span>
              <span className="font-semibold text-gray-900">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 ${
                orderType === 'BUY' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-red-500 hover:bg-red-600'
              } text-white py-2 rounded-lg transition duration-200 disabled:bg-gray-400`}
              disabled={loading}
            >
              {loading ? 'Processing...' : `${orderType}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
