import React from 'react';
import './Button.css';

const Button = ({ text, onClick, variant = 'primary', type = 'button' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;