import React from 'react';
import './TransactionItem.css';

const TransactionItem = ({ transaction, onEdit, onDelete }) => {
  return (
    <div className="transaction-item">
      <div className="transaction-info">
        <h4>{transaction.title}</h4>
        <p>
          {new Date(transaction.date).toLocaleDateString()} • {transaction.category}
        </p>
        {transaction.description && (
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
            {transaction.description}
          </p>
        )}
        <span className="transaction-category">{transaction.category}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span className={`transaction-amount ${transaction.type}`}>
          {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
        </span>
        <div className="transaction-actions">
          <button onClick={() => onEdit(transaction)} className="edit-btn">
            Edit
          </button>
          <button onClick={() => onDelete(transaction.id)} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;