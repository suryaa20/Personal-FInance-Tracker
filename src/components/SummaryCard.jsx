import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ type, amount }) => {
  const getTitle = () => {
    switch(type) {
      case 'balance': return 'Total Balance';
      case 'income': return 'Total Income';
      case 'expense': return 'Total Expenses';
      default: return '';
    }
  };

  const getIcon = () => {
    switch(type) {
      case 'balance': return '💰';
      case 'income': return '📈';
      case 'expense': return '📉';
      default: return '';
    }
  };

  return (
    <div className={`summary-card ${type}`}>
      <h3>{getTitle()}</h3>
      <div className="amount">₹{amount.toFixed(2)}</div>
      <span className="card-icon">{getIcon()}</span>
    </div>
  );
};

export default SummaryCard;