import React from 'react';
import { BrowserRouter as Router, useRoutes, Navigate } from 'react-router-dom';
import Clients from '../pages/Clients';
import CreateClient from '../pages/CreateClient';
import EditClient from '../pages/EditClient';
import Login from '../pages/Login';
import Register from '../pages/Register';

const App = () => {
  return useRoutes([
    { path: '/', element: <Navigate to="/login" /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/clients/edit/:id', element: <EditClient /> },
    { path: '/clients/create', element: <CreateClient /> },
    { path: '/clients', element: <Clients /> }
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