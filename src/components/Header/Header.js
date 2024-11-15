import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1>Task Scheduler</h1>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/notifications">Notifications</Link>
      </nav>
    </header>
  );
};

export default Header;