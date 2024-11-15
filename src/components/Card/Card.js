import React from 'react';
import './Card.css';

const Card = ({ title, description, priority, footer }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{title}</h3>
      </div>
      <div className="card-body">
        <p>{description}</p>
      </div>
      <div className='footer'>
      <div className="status">
        {priority && <p className="status">Priority: {priority}</p>}
      </div>
      <div className='card-footer'>
        {footer && <div>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;