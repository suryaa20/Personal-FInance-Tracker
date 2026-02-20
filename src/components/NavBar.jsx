import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';
import './NavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  if (!auth) return null;

  const { currentUser, logout } = auth;

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <span className="logo-icon">💰</span>
          FinanceTracker
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <span className="user-email">
                  Hi, {currentUser.email}
                </span>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
