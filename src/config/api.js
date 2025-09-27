// Configuración de la API
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8001',
  ENDPOINTS: {
    HEALTH: '/health',
    AUTH: {
      LOGIN: '/api/v1/auth/login',
      REGISTER: '/api/v1/auth/register',
      REFRESH: '/api/v1/auth/refresh',
      VERIFY_LICENSE: '/api/v1/auth/verify-license',
      HEALTH: '/api/v1/auth/health'
    }
  }
};

// Función helper para construir URLs completas
export const buildApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Headers por defecto para las peticiones
export const getDefaultHeaders = () => {
  return {
    'Content-Type': 'application/json',
  };
};

// Headers con autenticación
export const getAuthHeaders = (token) => {
  return {
    ...getDefaultHeaders(),
    'Authorization': `Bearer ${token}`
  };
};
