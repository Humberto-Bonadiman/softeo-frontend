import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Login from '../pages/Login';

const App = () => {
  return useRoutes([
    { path: '/', element: <Navigate to="/users/1" /> },
    { path: '/login', element: <Login /> }
  ]);
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppRoutes;