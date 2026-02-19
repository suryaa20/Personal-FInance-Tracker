import React from 'react';
import'./TransactionList.css';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list">
        <div className="empty-state">
          <p>No transactions found. Add your first transaction above!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3>Recent Transactions</h3>
      {transactions.map(transaction => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TransactionList;