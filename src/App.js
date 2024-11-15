import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TestComponent from './TestComponent';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import TaskDetails from './pages/TaskDetails';
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <div className='header-div'>
          <Header/>
        </div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/tasks/:id" element={<TaskDetails/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;