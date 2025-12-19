import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">RIZBOT Trading</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm">Welcome, {user?.username}</span>
          <span className="bg-white text-blue-600 px-4 py-1 rounded-full font-semibold">
            ${user?.balance.toFixed(2)}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
