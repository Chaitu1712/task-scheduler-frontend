import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <header className="header">
      <h1>Task Scheduler</h1>

      <div className='nav'>
      <Link to="/">
        <div className="nav_dashboard">
        Dashboard
        </div>
      </Link>
      <Link to="/notifications">
        <div className="nav_notifications">
        Notifications
        </div>
      </Link>
      </div>
    </header>
  );
};

export default Header;