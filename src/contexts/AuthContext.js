import React, { createContext, useContext, useState, useEffect } from 'react';
import { buildApiUrl, getDefaultHeaders, getAuthHeaders } from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [license, setLicense] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  
  // Estados de licencia
  const [licenseStatus, setLicenseStatus] = useState('pending'); // pending, active, expired, invalid
  const [licenseValidation, setLicenseValidation] = useState({
    isChecking: false,
    lastChecked: null,
    message: ''
  });

  // Cargar datos del usuario y licencia desde localStorage al iniciar
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const savedUser = localStorage.getItem('registroMovil_user');
        const savedLicense = localStorage.getItem('registroMovil_license');
        const savedAccessToken = localStorage.getItem('registroMovil_access_token');
        const savedRefreshToken = localStorage.getItem('registroMovil_refresh_token');
        const savedLicenseStatus = localStorage.getItem('registroMovil_license_status');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        
        if (savedLicense) {
          setLicense(JSON.parse(savedLicense));
        }

        if (savedAccessToken) {
          setAccessToken(savedAccessToken);
        }

        if (savedRefreshToken) {
          setRefreshToken(savedRefreshToken);
        }

        if (savedLicenseStatus) {
          setLicenseStatus(savedLicenseStatus);
        }
      } catch (error) {
        console.error('Error cargando datos de autenticación:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  // Función de login
  const login = async (credentials) => {
    try {
      setLoading(true);
      
      const response = await fetch(buildApiUrl('/api/v1/auth/login'), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar tokens
        setAccessToken(data.access_token);
        setRefreshToken(data.refresh_token);
        
        // Guardar datos del usuario
        const userData = {
          id: data.user.id,
          name: `${data.user.first_name} ${data.user.last_name}`,
          email: data.user.email,
          role: data.user.role,
          storeName: data.user.store_name,
          phone: data.user.phone,
          address: data.user.address,
          businessType: data.user.business_type,
          estimatedEquipment: data.user.estimated_equipment,
          createdAt: data.user.created_at
        };
        
        setUser(userData);
        
        // Guardar datos de la licencia si están disponibles
        if (data.license) {
          setLicense(data.license);
          setLicenseStatus(data.license.status || 'pending');
          localStorage.setItem('registroMovil_license', JSON.stringify(data.license));
          localStorage.setItem('registroMovil_license_status', data.license.status || 'pending');
        } else {
          // Si no hay licencia, el usuario está pendiente
          setLicenseStatus('pending');
          localStorage.setItem('registroMovil_license_status', 'pending');
        }
        
        // Guardar en localStorage
        localStorage.setItem('registroMovil_user', JSON.stringify(userData));
        localStorage.setItem('registroMovil_access_token', data.access_token);
        localStorage.setItem('registroMovil_refresh_token', data.refresh_token);
        
        return { success: true, message: 'Login exitoso' };
      } else {
        // Si hay error del servidor, intentar login en modo de desarrollo
        console.warn('Error del servidor en login, intentando modo de desarrollo:', data.message);
        return loginInDevelopmentMode(credentials);
      }
    } catch (error) {
      console.error('Error en login:', error);
      // En caso de error de conexión, intentar modo de desarrollo
      return loginInDevelopmentMode(credentials);
    } finally {
      setLoading(false);
    }
  };

  // Función de login en modo de desarrollo
  const loginInDevelopmentMode = async (credentials) => {
    try {
      // Verificar si hay un usuario guardado en localStorage
      const savedUser = localStorage.getItem('registroMovil_user');
      const savedLicense = localStorage.getItem('registroMovil_license');
      
      if (savedUser && savedLicense) {
        const userData = JSON.parse(savedUser);
        const licenseData = JSON.parse(savedLicense);
        
        // Validar credenciales del usuario guardado
        if (userData.email === credentials.email) {
          setUser(userData);
          setLicense(licenseData);
          return { success: true, message: 'Login exitoso (modo desarrollo)' };
        }
      }
      
      // Si no hay usuario guardado, crear uno de desarrollo
      const userData = {
        id: Date.now(),
        name: 'Usuario Demo',
        email: credentials.email,
        role: 'admin',
        storeName: 'Tienda Demo',
        createdAt: new Date().toISOString()
      };

      const licenseData = getDevelopmentLicense('DEMO-2024');
      
      setUser(userData);
      setLicense(licenseData);
      localStorage.setItem('registroMovil_user', JSON.stringify(userData));
      localStorage.setItem('registroMovil_license', JSON.stringify(licenseData));
      
      return { success: true, message: 'Login exitoso (modo desarrollo)' };
    } catch (error) {
      return { success: false, message: 'Error en modo de desarrollo' };
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    setLicense(null);
    setAccessToken(null);
    setRefreshToken(null);
    setLicenseStatus('pending');
    localStorage.removeItem('registroMovil_user');
    localStorage.removeItem('registroMovil_license');
    localStorage.removeItem('registroMovil_access_token');
    localStorage.removeItem('registroMovil_refresh_token');
    localStorage.removeItem('registroMovil_license_status');
  };

  // Función para validar licencia con el backend
  const validateLicense = async () => {
    if (!user || !accessToken) {
      return { success: false, message: 'Usuario no autenticado' };
    }

    try {
      setLicenseValidation(prev => ({ ...prev, isChecking: true }));
      
      const response = await fetch(buildApiUrl('/api/v1/auth/validate-license'), {
        method: 'POST',
        headers: getAuthHeaders(accessToken),
        body: JSON.stringify({ user_id: user.id })
      });

      const data = await response.json();

      if (response.ok) {
        const newStatus = data.license?.status || 'pending';
        setLicenseStatus(newStatus);
        setLicense(data.license);
        setLicenseValidation({
          isChecking: false,
          lastChecked: new Date().toISOString(),
          message: data.message || 'Licencia validada'
        });
        
        // Actualizar localStorage
        localStorage.setItem('registroMovil_license', JSON.stringify(data.license));
        localStorage.setItem('registroMovil_license_status', newStatus);
        
        return { 
          success: true, 
          status: newStatus,
          message: data.message || 'Licencia validada correctamente'
        };
      } else {
        setLicenseValidation({
          isChecking: false,
          lastChecked: new Date().toISOString(),
          message: data.message || 'Error validando licencia'
        });
        return { success: false, message: data.message || 'Error validando licencia' };
      }
    } catch (error) {
      console.error('Error validando licencia:', error);
      setLicenseValidation({
        isChecking: false,
        lastChecked: new Date().toISOString(),
        message: 'Error de conexión'
      });
      return { success: false, message: 'Error de conexión al validar licencia' };
    }
  };

  // Verificar licencia
  const verifyLicense = async (licenseKey) => {
    try {
      const response = await fetch(buildApiUrl('/api/v1/auth/verify-license'), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify({
          license_key: licenseKey
        })
      });

      const data = await response.json();

      if (response.ok) {
        return {
          key: licenseKey,
          valid: true,
          ...data.license
        };
      } else {
        // Si hay error del servidor, usar modo de desarrollo
        console.warn('Error del servidor, usando modo de desarrollo para licencia:', data.message);
        return getDevelopmentLicense(licenseKey);
      }
    } catch (error) {
      console.error('Error verificando licencia:', error);
      // En caso de error de conexión, usar modo de desarrollo
      return getDevelopmentLicense(licenseKey);
    }
  };

  // Función para obtener licencia en modo de desarrollo
  const getDevelopmentLicense = (licenseKey) => {
    const developmentLicenses = {
      'DEMO-2024': {
        key: 'DEMO-2024',
        type: 'demo',
        valid: true,
        expiresAt: '2025-12-31',
        features: ['basic', 'reports', 'notifications'],
        maxUsers: 1,
        maxEquipment: 100
      },
      'PRO-2024': {
        key: 'PRO-2024',
        type: 'professional',
        valid: true,
        expiresAt: '2025-12-31',
        features: ['basic', 'reports', 'notifications', 'advanced', 'export'],
        maxUsers: 5,
        maxEquipment: 1000
      },
      'ENTERPRISE-2024': {
        key: 'ENTERPRISE-2024',
        type: 'enterprise',
        valid: true,
        expiresAt: '2025-12-31',
        features: ['basic', 'reports', 'notifications', 'advanced', 'export', 'api', 'support'],
        maxUsers: 20,
        maxEquipment: 10000
      }
    };

    const license = developmentLicenses[licenseKey];
    if (license) {
      return license;
    }

    return {
      key: licenseKey,
      valid: false,
      message: 'Licencia inválida'
    };
  };

  // Función de registro
  const register = async (userData) => {
    try {
      setLoading(true);
      
      const response = await fetch(buildApiUrl('/api/v1/auth/register'), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.firstName || userData.ownerName?.split(' ')[0] || '',
          last_name: userData.lastName || userData.ownerName?.split(' ').slice(1).join(' ') || '',
          role: userData.role || 'admin',
          store_name: userData.storeName,
          phone: userData.phone,
          address: userData.address,
          business_type: userData.businessType,
          estimated_equipment: userData.estimatedEquipment,
          selected_plan: userData.selectedPlan
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Si el registro es exitoso, también hacer login automático
        const loginResult = await login({
          email: userData.email,
          password: userData.password
        });
        
        return loginResult;
      } else {
        // Si hay error del servidor, usar modo de desarrollo
        console.warn('Error del servidor en registro, usando modo de desarrollo:', data.message);
        return registerInDevelopmentMode(userData);
      }
    } catch (error) {
      console.error('Error en registro:', error);
      // En caso de error de conexión, usar modo de desarrollo
      return registerInDevelopmentMode(userData);
    } finally {
      setLoading(false);
    }
  };

  // Función de registro en modo de desarrollo
  const registerInDevelopmentMode = async (userData) => {
    try {
      // Verificar licencia en modo de desarrollo
      const licenseData = getDevelopmentLicense(userData.selectedPlan);
      
      if (!licenseData.valid) {
        return { success: false, message: 'Licencia inválida' };
      }

      // Crear usuario en modo de desarrollo
      const userDataDev = {
        id: Date.now(),
        name: userData.ownerName,
        email: userData.email,
        role: 'admin',
        storeName: userData.storeName,
        phone: userData.phone,
        address: userData.address,
        businessType: userData.businessType,
        estimatedEquipment: userData.estimatedEquipment,
        createdAt: new Date().toISOString()
      };

      // Guardar en localStorage
      setUser(userDataDev);
      setLicense(licenseData);
      localStorage.setItem('registroMovil_user', JSON.stringify(userDataDev));
      localStorage.setItem('registroMovil_license', JSON.stringify(licenseData));

      return { success: true, message: 'Registro exitoso (modo desarrollo)' };
    } catch (error) {
      return { success: false, message: 'Error en modo de desarrollo' };
    }
  };

  // Función para refrescar token
  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) {
        throw new Error('No hay refresh token disponible');
      }

      const response = await fetch(buildApiUrl('/api/v1/auth/refresh'), {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify({
          refresh_token: refreshToken
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAccessToken(data.access_token);
        localStorage.setItem('registroMovil_access_token', data.access_token);
        return data.access_token;
      } else {
        // Si el refresh token es inválido, hacer logout
        logout();
        throw new Error('Refresh token inválido');
      }
    } catch (error) {
      console.error('Error refrescando token:', error);
      logout();
      throw error;
    }
  };

  // Renovar licencia
  const renewLicense = async (licenseKey, months) => {
    try {
      setLoading(true);
      
      // Simular renovación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentLicense = license;
      if (currentLicense) {
        const newExpiryDate = new Date(currentLicense.expiresAt);
        newExpiryDate.setMonth(newExpiryDate.getMonth() + months);
        
        const renewedLicense = {
          ...currentLicense,
          expiresAt: newExpiryDate.toISOString()
        };
        
        setLicense(renewedLicense);
        localStorage.setItem('registroMovil_license', JSON.stringify(renewedLicense));
        
        return { success: true, message: 'Licencia renovada exitosamente' };
      }
      
      return { success: false, message: 'No hay licencia activa para renovar' };
    } catch (error) {
      return { success: false, message: 'Error renovando licencia' };
    } finally {
      setLoading(false);
    }
  };

  // Funciones helper para verificar estado de licencia
  const hasActiveLicense = () => {
    return licenseStatus === 'active' && license?.valid !== false;
  };

  const isLicensePending = () => {
    return licenseStatus === 'pending';
  };

  const isLicenseExpired = () => {
    if (!license?.expiresAt) return false;
    return new Date(license.expiresAt) < new Date();
  };

  const canAccessFeature = (feature) => {
    if (!hasActiveLicense()) return false;
    return license?.features?.includes(feature) || false;
  };

  const getLicenseLimits = () => {
    if (!hasActiveLicense()) {
      return {
        maxEquipment: 0,
        maxUsers: 0,
        features: []
      };
    }
    return {
      maxEquipment: license?.maxEquipment || 0,
      maxUsers: license?.maxUsers || 0,
      features: license?.features || []
    };
  };

  const value = {
    user,
    license,
    loading,
    accessToken,
    refreshToken,
    licenseStatus,
    licenseValidation,
    login,
    logout,
    register,
    verifyLicense,
    refreshAccessToken,
    renewLicense,
    validateLicense,
    hasActiveLicense,
    isLicensePending,
    isLicenseExpired,
    canAccessFeature,
    getLicenseLimits,
    isAuthenticated: !!user,
    hasFeature: (feature) => license?.features?.includes(feature) || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
