import React from 'react';
import styles from './Button.module.css';

const Button = ({ text, onClick, variant = 'primary', type = 'button' }) => {
  const variantClass = `btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`;
  return (
    <button className={`${styles.btn} ${styles[variantClass]}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;