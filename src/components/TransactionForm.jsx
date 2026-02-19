import React, { useState, useEffect } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ onSubmit, editingTransaction }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'other',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        title: editingTransaction.title || '',
        amount: editingTransaction.amount || '',
        category: editingTransaction.category || 'other',
        type: editingTransaction.type || 'expense',
        date: editingTransaction.date || new Date().toISOString().split('T')[0],
        description: editingTransaction.description || ''
      });
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    if (!editingTransaction) {
      setFormData({
        title: '',
        amount: '',
        category: 'other',
        type: 'expense',
        date: new Date().toISOString().split('T')[0],
        description: ''
      });
    }
  };

  return (
    <div className="transaction-form">
      <h3 className="form-title">
        {editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter title"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Amount (₹)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="salary">Salary</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Add description..."
          />
        </div>

        <button type="submit" className="submit-btn">
          {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;