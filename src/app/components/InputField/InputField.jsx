import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ label, type = 'text', value, onChange, placeholder, min, max, step }) => {
  return (
    <div className={styles.inputField}>
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export default InputField;