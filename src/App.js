import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import UserRegister from './components/UserRegister';
import Inventory from './components/Inventory';
import Receipt from './components/Receipt';
import Sales from './components/Sales';
import Purchases from './components/Purchases';
import Repairs from './components/Repairs';
import Clients from './components/Clients';
import Settings from './components/Settings';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import MobileFeatures from './components/MobileFeatures';
import Accessories from './components/Accessories';
import Sidebar from './components/Sidebar';
import SyncNotification from './components/SyncNotification';
import ProtectedRoute from './components/ProtectedRoute';



// Componente principal de la aplicación
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flexGrow: 1 }}>
            <SyncNotification />
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Rutas que requieren licencia activa */}
              <Route path="/dashboard" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/user-register" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <UserRegister />
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Inventory />
                </ProtectedRoute>
              } />
              <Route path="/receipt" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Receipt />
                </ProtectedRoute>
              } />

              {/* Operaciones */}
              <Route path="/sales" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Sales />
                </ProtectedRoute>
              } />
              <Route path="/purchases" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Purchases />
                </ProtectedRoute>
              } />
              <Route path="/repairs" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Repairs />
                </ProtectedRoute>
              } />

              {/* Administración */}
              <Route path="/clients" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Clients />
                </ProtectedRoute>
              } />
              <Route path="/accessories" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Accessories />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Settings />
                </ProtectedRoute>
              } />

              {/* Nuevas Funcionalidades Avanzadas */}
              <Route path="/reports" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Reports />
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <Notifications />
                </ProtectedRoute>
              } />
              <Route path="/mobile-features" element={
                <ProtectedRoute requireActiveLicense={true}>
                  <MobileFeatures />
                </ProtectedRoute>
              } />

              {/* Redirigir rutas no encontradas al dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      )}
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
