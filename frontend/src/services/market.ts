import api from './api';
import type { Stock } from '../types';

export const marketService = {
  getMarketData: async (): Promise<Stock[]> => {
    const response = await api.get<Stock[]>('/market');
    return response.data;
  },

  getSymbol: async (symbol: string): Promise<Stock> => {
    const response = await api.get<Stock>(`/market/${symbol}`);
    return response.data;
  }
};
