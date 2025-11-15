import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import TaskForm from './components/TaskForm';
import { ProtectedRoute } from './components/ProtectedRoute';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/tasks/new" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        <Route path="/tasks/:id/edit" element={<ProtectedRoute><TaskForm /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </Layout>
  );
};

export default App;
