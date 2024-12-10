import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, description, priority, deadline, status, footer }) => {
  // Component logic
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cardBody}>
        <p>{description}</p>
      </div>
      <div className={styles.footer}>
        {/* Footer content */}
      </div>
    </div>
  );
};

export default Card;