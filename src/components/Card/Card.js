import React from 'react';
import './Card.css';

const Card = ({ title, description, priority, deadline, status, footer }) => {
  const getDeadlineText = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
      return 'Today';
    } else if (daysDiff === 1) {
      return 'Tomorrow';
    } else {
      return deadlineDate.toLocaleDateString();
    }
  };

  const isDeadlineSoon = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate - today;
    const daysDiff = timeDiff / (1000 * 3600 * 24);
    return daysDiff <= 1;
  };

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
          {deadline && status !== 'COMPLETED' && (
            <p className={`deadline ${isDeadlineSoon(deadline) ? 'red-deadline' : ''}`}>
              Deadline: {getDeadlineText(deadline)}
            </p>
          )}
          {deadline && status === 'COMPLETED' && (
            <p className="deadline completed-deadline" title={`Deadline: ${getDeadlineText(deadline)}`}>
              Deadline: {getDeadlineText(deadline)}
            </p>
          )}
        </div>
        <div className='card-footer'>
          {footer && <div>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;