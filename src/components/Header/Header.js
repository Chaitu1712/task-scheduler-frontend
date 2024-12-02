import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/userService';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/login');
  };

  return (
    <header className="header">
      <h1>Task Scheduler</h1>
      <div className='nav'>
        <Link to="/dashboard">
          <div className="nav_dashboard">
            Dashboard
          </div>
        </Link>
        <Link to="/notifications">
          <div className="nav_notifications">
            Notifications
          </div>
        </Link>
        <div onClick={handleLogout} className="nav_logout">
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;