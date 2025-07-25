import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-purple-700 py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-white font-bold text-xl">Goalsetter</Link>
      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-4 py-2 rounded hover:bg-purple-100 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/register" className="text-white">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;