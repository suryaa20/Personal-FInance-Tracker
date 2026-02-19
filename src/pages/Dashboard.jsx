import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTransactions } from '../hooks/useTransactions';
import SummaryCard from '../components/SummaryCard';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import Filters from '../components/Filters';
import Charts from '../components/Charts';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { 
    transactions, 
    loading, 
    addTransaction, 
    updateTransaction, 
    deleteTransaction 
  } = useTransactions();
  
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showCharts, setShowCharts] = useState(true);

  useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filterType]);

  const calculateTotals = () => {
    const totals = transactions.reduce((acc, t) => {
      if (t.type === 'income') {
        acc.income += t.amount;
      } else {
        acc.expense += t.amount;
      }
      return acc;
    }, { income: 0, expense: 0 });

    return {
      ...totals,
      balance: totals.income - totals.expense
    };
  };

  const handleAddTransaction = async (transaction) => {
    if (editingTransaction) {
      await updateTransaction(editingTransaction.id, transaction);
      setEditingTransaction(null);
    } else {
      await addTransaction(transaction);
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      await deleteTransaction(id);
    }
  };

  if (!currentUser) {
    return (
      <div className="container">
        <div className="empty-state">
          <h2>Welcome to FinanceTracker!</h2>
          <p>Please login or register to start tracking your finances.</p>
          <div className="empty-state-buttons">
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading">Loading your transactions...</div>;
  }

  const totals = calculateTotals();

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Financial Dashboard</h1>
          <button 
            className="toggle-charts-btn"
            onClick={() => setShowCharts(!showCharts)}
          >
            {showCharts ? '📊 Hide Charts' : '📊 Show Charts'}
          </button>
        </div>

        <div className="summary-grid">
          <SummaryCard type="balance" amount={totals.balance} />
          <SummaryCard type="income" amount={totals.income} />
          <SummaryCard type="expense" amount={totals.expense} />
        </div>

        {showCharts && <Charts transactions={transactions} />}

        <TransactionForm 
          onSubmit={handleAddTransaction}
          editingTransaction={editingTransaction}
        />

        <Filters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        <TransactionList 
          transactions={filteredTransactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </div>
    </div>
  );
};

export default Dashboard;