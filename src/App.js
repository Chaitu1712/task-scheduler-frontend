import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/Dashboard';
import Notifications from './pages/Notifications';
import TaskDetails from './pages/TaskDetails';
import Header from './components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import { NotificationProvider } from './NotificationProvider';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/';

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Perform logout logic here, e.g., clearing tokens, etc.
      localStorage.removeItem('authToken'); // Example: remove auth token from local storage
      navigate('/login');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  return (
    <div className="App">
      {!hideHeader && (
        <div className='header-div'>
          <Header/>
        </div>
      )}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/tasks/:id" element={<TaskDetails/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </Router>
  );
}

export default App;