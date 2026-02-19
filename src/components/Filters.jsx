import React from 'react';
import './Filters.css';

const Filters = ({ searchTerm, onSearchChange, filterType, onFilterChange }) => {
  return (
    <div className="filters-section">
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filterType === 'income' ? 'active' : ''}`}
          onClick={() => onFilterChange('income')}
        >
          Income
        </button>
        <button 
          className={`filter-btn ${filterType === 'expense' ? 'active' : ''}`}
          onClick={() => onFilterChange('expense')}
        >
          Expenses
        </button>
      </div>
    </div>
  );
};

export default Filters;