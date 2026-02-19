import React from 'react';

const About = () => {
  return (
    <div className="container">
      <div className="about-container">
        <h1 className="about-title">About FinanceTracker</h1>
        <p className="about-text">
          Welcome to FinanceTracker - your personal finance management solution! 
          This application helps you track your income and expenses, manage your budget, 
          and achieve your financial goals.
        </p>
        <p className="about-text">
          <strong>Features:</strong>
        </p>
        <ul>
          <li>🔐 Secure authentication with Firebase</li>
          <li>💾 Cloud storage - access your data anywhere</li>
          <li>📊 Track all your transactions in one place</li>
          <li>💰 View your balance, income, and expenses at a glance</li>
          <li>🔍 Filter transactions by type and search</li>
          <li>✏️ Add, edit, and delete transactions easily</li>
          <li>📱 Responsive design - works on all devices</li>
          <li>🎨 Clean and modern user interface</li>
        </ul>
        <p className="about-text">
          <strong>Technologies used:</strong>
        </p>
        <ul>
          <li>⚛️ React - UI library</li>
          <li>🔥 Firebase - Authentication & Database</li>
          <li>🔄 React Router - Navigation</li>
          <li>⚡ Vite - Build tool</li>
          <li>🎨 CSS - Styling</li>
        </ul>
        <p className="about-text">
          This project demonstrates modern web development practices including 
          components, hooks, routing, context API, and cloud integration with Firebase.
        </p>
      </div>
    </div>
  );
};

export default About;