import React from 'react';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import TestComponent from './TestComponent';
// Import pages (add placeholders if they’re not created yet)
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import TaskDetails from './pages/TaskDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/task/:id" element={<TaskDetails/>} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;