import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CardProvider } from './context/CardContext';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreatorDashboard from './components/creator/CreatorDashboard';
import PlayerDashboard from './components/player/PlayerDashboard';
import './styles/global.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CardProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/creator" 
                element={
                  <ProtectedRoute>
                    <CreatorDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/player" 
                element={
                  <ProtectedRoute>
                    <PlayerDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Layout>
        </CardProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;