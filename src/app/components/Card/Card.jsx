import React from 'react';
import styles from './Card.module.css';

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
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h3>{title}</h3>
      </div>
      <div className={styles.cardBody}>
        <p>{description}</p>
      </div>
      <div className={styles.footer}>
        <div className={styles.status}>
          {priority && <p className={styles.status}>Priority: {priority}</p>}
          {deadline && status !== 'COMPLETED' && (
            <p className={`${styles.deadline} ${isDeadlineSoon(deadline) ? styles.redDeadline : ''}`}>
              Deadline: {getDeadlineText(deadline)}
            </p>
          )}
          {deadline && status === 'COMPLETED' && (
            <p className={styles.deadline} title={`Deadline: ${getDeadlineText(deadline)}`}>
              Deadline: {getDeadlineText(deadline)}
            </p>
          )}
          </div>
        <div className={styles.cardFooter}>
          {footer && <div>{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Card;