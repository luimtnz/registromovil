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



// Componente principal de la aplicación
function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      {isAuthenticated ? (
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user-register" element={<UserRegister />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/receipt" element={<Receipt />} />

              {/* Operaciones */}
              <Route path="/sales" element={<Sales />} />
              <Route path="/purchases" element={<Purchases />} />
              <Route path="/repairs" element={<Repairs />} />

              {/* Administración */}
              <Route path="/clients" element={<Clients />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/settings" element={<Settings />} />

              {/* Nuevas Funcionalidades Avanzadas */}
              <Route path="/reports" element={<Reports />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/mobile-features" element={<MobileFeatures />} />

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
