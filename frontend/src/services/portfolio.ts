import api from './api';
import type { Portfolio, Transaction, OrderRequest } from '../types';

export const portfolioService = {
  getPortfolio: async (): Promise<Portfolio[]> => {
    const response = await api.get<Portfolio[]>('/portfolio');
    return response.data;
  },

  getTransactions: async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
  },

  placeOrder: async (order: OrderRequest): Promise<any> => {
    const response = await api.post('/order', order);
    return response.data;
  }
};
