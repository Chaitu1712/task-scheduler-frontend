"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutUser } from '../../services/userService';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutUser();
    localStorage.removeItem('userId');
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <h1>Task Scheduler</h1>
      <div className={styles.nav}>
        <Link href="/dashboard">
          <div className={styles.navDashboard}>
            Dashboard
          </div>
        </Link>
        <Link href="/notifications">
          <div className={styles.navNotifications}>
            Notifications
          </div>
        </Link>
        <div onClick={handleLogout} className={styles.nav_logout}>
          Logout
        </div>
      </div>
    </header>
  );
};

export default Header;