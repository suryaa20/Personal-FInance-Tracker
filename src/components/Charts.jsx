import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../contexts/ThemeContext';
import './Charts.css';

const Charts = ({ transactions }) => {
  const { isDarkMode } = useTheme();

  const getExpenseByCategory = () => {
    const expenses = transactions.filter(t => t.type === 'expense');
    const categoryMap = {};
    
    expenses.forEach(expense => {
      const category = expense.category;
      if (categoryMap[category]) {
        categoryMap[category] += expense.amount;
      } else {
        categoryMap[category] = expense.amount;
      }
    });

    return Object.keys(categoryMap).map(category => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: categoryMap[category]
    }));
  };

  const getMonthlyData = () => {
    const monthlyMap = {};
    
    transactions.forEach(t => {
      const date = new Date(t.date);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      
      if (!monthlyMap[monthYear]) {
        monthlyMap[monthYear] = { month: monthYear, income: 0, expense: 0 };
      }
      
      if (t.type === 'income') {
        monthlyMap[monthYear].income += t.amount;
      } else {
        monthlyMap[monthYear].expense += t.amount;
      }
    });

    return Object.values(monthlyMap).sort((a, b) => {
      return new Date(a.month) - new Date(b.month);
    }).slice(-6); 
  };

  const expenseData = getExpenseByCategory();
  const monthlyData = getMonthlyData();

  const COLORS = ['#ff7e5f', '#feb47b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];

  const chartTextColor = isDarkMode ? '#f9f9f9' : '#2d3436';
  const chartGridColor = isDarkMode ? '#404258' : '#e0e0e0';

  if (transactions.length === 0) {
    return (
      <div className="no-chart-data">
        <p>Add some transactions to see charts!</p>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3 className="chart-title">Expenses by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={expenseData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {expenseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: isDarkMode ? '#2d2f45' : '#fff',
                border: 'none',
                borderRadius: '8px',
                color: chartTextColor
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Monthly Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartGridColor} />
            <XAxis dataKey="month" stroke={chartTextColor} />
            <YAxis stroke={chartTextColor} />
            <Tooltip 
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{
                backgroundColor: isDarkMode ? '#2d2f45' : '#fff',
                border: 'none',
                borderRadius: '8px',
                color: chartTextColor
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="#4ecdc4" />
            <Bar dataKey="expense" fill="#ff7e5f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;