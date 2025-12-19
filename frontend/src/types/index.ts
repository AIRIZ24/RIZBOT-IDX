export interface User {
  id: number;
  email: string;
  username: string;
  balance: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
}

export interface Stock {
  id: number;
  symbol: string;
  name: string;
  current_price: number;
  change_percent: number;
  volume: number;
  updated_at: string;
}

export interface Portfolio {
  id: number;
  user_id: number;
  symbol: string;
  name: string;
  quantity: number;
  average_price: number;
  current_price: number;
  current_value: number;
  profit_loss_percent: number;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  symbol: string;
  name: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  total_amount: number;
  created_at: string;
}

export interface OrderRequest {
  symbol: string;
  type: 'BUY' | 'SELL';
  quantity: number;
  price: number;
}

export interface OrderResponse {
  message: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  quantity: number;
  price: number;
  totalAmount: number;
}
