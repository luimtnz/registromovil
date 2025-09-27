import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LicensePending from './LicensePending';
import LimitedAccess from './LimitedAccess';

function ProtectedRoute({ children, requireActiveLicense = true }) {
  const { 
    isAuthenticated, 
    hasActiveLicense, 
    isLicensePending, 
    loading 
  } = useAuth();

  // Mostrar loading mientras se verifica la autenticación
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (el router redirigirá al login)
  if (!isAuthenticated) {
    return null;
  }

  // Si requiere licencia activa pero no la tiene
  if (requireActiveLicense && !hasActiveLicense()) {
    // Si la licencia está pendiente, mostrar pantalla de validación
    if (isLicensePending()) {
      return <LicensePending />;
    }
    
    // Si la licencia está expirada o es inválida, mostrar pantalla de acceso limitado
    return <LimitedAccess />;
  }

  // Si tiene acceso, mostrar el contenido protegido
  return children;
}

export default ProtectedRoute;
