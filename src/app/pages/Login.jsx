'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginUser } from '../services/userService';
import styles from './Login.module.css';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      const userId = response.userId;
      localStorage.setItem('userId', userId);
      toast.success(`Welcome ${username}!`, {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      router.replace('/dashboard');
    } catch (error) {
      toast.error('Invalid credentials', {
        position: 'bottom-left',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <div className={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className={styles.passwordToggle}
            onMouseDown={handlePasswordVisibility}
            onMouseUp={handlePasswordVisibility}
          >
            {showPassword ? '🔓' : '🔒'}
          </span>
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account?{' '}
          <a href="#" onClick={(e) => {
            e.preventDefault();
            router.replace('/register');
          }}>
            Register
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;