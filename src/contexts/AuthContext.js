import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Cargar datos del usuario y licencia desde localStorage al iniciar
  useEffect(() => {
    const loadAuthData = () => {
      try {
        const savedUser = localStorage.getItem('registroMovil_user');
        const savedLicense = localStorage.getItem('registroMovil_license');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        
        if (savedLicense) {
          setLicense(JSON.parse(savedLicense));
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
      
      // Verificar si es un usuario registrado en localStorage
      const savedUser = localStorage.getItem('registroMovil_user');
      const savedLicense = localStorage.getItem('registroMovil_license');
      
      if (savedUser && savedLicense) {
        const userData = JSON.parse(savedUser);
        const licenseData = JSON.parse(savedLicense);
        
        // Validar credenciales del usuario registrado
        if (userData.email === credentials.email && userData.password === credentials.password) {
          // Verificar que la licencia no haya expirado
          const now = new Date();
          const expiryDate = new Date(licenseData.expiresAt);
          
          if (now > expiryDate) {
            return { success: false, message: 'Su licencia ha expirado. Contacte soporte.' };
          }
          
          setUser(userData);
          setLicense(licenseData);
          
          return { success: true, message: 'Login exitoso' };
        }
      }
      
      // Credenciales de administrador por defecto
      if (credentials.email === 'admin@registromovil.com' && credentials.password === 'admin123') {
        const userData = {
          id: 1,
          name: 'Administrador',
          email: credentials.email,
          role: 'admin',
          storeName: 'Mi Tienda Móvil',
          createdAt: new Date().toISOString()
        };

        // Verificar licencia para admin (usar DEMO-2024 por defecto)
        const licenseData = await verifyLicense('DEMO-2024');
        
        if (licenseData.valid) {
          setUser(userData);
          setLicense(licenseData);
          
          // Guardar en localStorage
          localStorage.setItem('registroMovil_user', JSON.stringify(userData));
          localStorage.setItem('registroMovil_license', JSON.stringify(licenseData));
          
          return { success: true, message: 'Login exitoso' };
        } else {
          return { success: false, message: 'Licencia inválida o expirada' };
        }
      } else if (credentials.email === 'empresa@registromovil.com' && credentials.password === 'empresa2025') {
        const userData = {
          id: 2,
          name: 'Gerente Empresarial',
          email: credentials.email,
          role: 'enterprise_admin',
          storeName: 'Registro Móvil Empresarial',
          createdAt: new Date().toISOString()
        };

        // Verificar licencia
        const licenseData = await verifyLicense(credentials.licenseKey);
        
        if (licenseData.valid) {
          setUser(userData);
          setLicense(licenseData);
          
          // Guardar en localStorage
          localStorage.setItem('registroMovil_user', JSON.stringify(userData));
          localStorage.setItem('registroMovil_license', JSON.stringify(licenseData));
          
          return { success: true, message: 'Login exitoso' };
        } else {
          return { success: false, message: 'Licencia inválida o expirada' };
        }
      } else {
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (error) {
      return { success: false, message: 'Error en el servidor' };
    } finally {
      setLoading(false);
    }
  };

  // Función de logout
  const logout = () => {
    setUser(null);
    setLicense(null);
    localStorage.removeItem('registroMovil_user');
    localStorage.removeItem('registroMovil_license');
  };

  // Verificar licencia
  const verifyLicense = async (licenseKey) => {
    // Simular verificación de licencia
    // En producción, esto sería una llamada a la API de licencias
    
    // Licencias de ejemplo para testing
    const validLicenses = {
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
        features: ['basic', 'reports', 'notifications', 'advanced', 'export', 'api', 'support', 'mobile', 'analytics', 'multi-store', 'priority-support', 'backup', 'custom-reports', 'advanced-inventory', 'client-management', 'repair-tracking', 'sales-analytics', 'purchase-management', 'accessory-management', 'qr-generation', 'data-export', 'system-monitoring'],
        maxUsers: 20,
        maxEquipment: 10000
      },
      'EMPRESA-2025': {
        key: 'EMPRESA-2025',
        type: 'enterprise',
        valid: true,
        expiresAt: '2026-12-31',
        features: ['basic', 'reports', 'notifications', 'advanced', 'export', 'api', 'support', 'mobile', 'analytics', 'multi-store', 'priority-support', 'backup', 'custom-reports', 'advanced-inventory', 'client-management', 'repair-tracking', 'sales-analytics', 'purchase-management', 'accessory-management', 'qr-generation', 'data-export', 'system-monitoring', 'enterprise-features', 'unlimited-users', 'custom-branding', 'white-label', 'dedicated-support'],
        maxUsers: 50,
        maxEquipment: 50000,
        storeName: 'Registro Móvil Empresarial'
      }
    };

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const license = validLicenses[licenseKey];
    
    if (license) {
      // Verificar si la licencia no ha expirado
      const now = new Date();
      const expiryDate = new Date(license.expiresAt);
      
      if (now > expiryDate) {
        return {
          key: licenseKey,
          valid: false,
          message: 'Licencia expirada'
        };
      }
      
      return license;
    }
    
    return {
      key: licenseKey,
      valid: false,
      message: 'Licencia inválida'
    };
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

  const value = {
    user,
    license,
    loading,
    login,
    logout,
    renewLicense,
    isAuthenticated: !!user,
    hasFeature: (feature) => license?.features?.includes(feature) || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
