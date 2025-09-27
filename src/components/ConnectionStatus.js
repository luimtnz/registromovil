import React, { useState, useEffect } from 'react';
import { buildApiUrl } from '../config/api';
import {
  Chip,
  Box,
  Tooltip,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import {
  CheckCircle,
  Error,
  Refresh,
  WifiOff,
  Wifi
} from '@mui/icons-material';

function ConnectionStatus() {
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: false,
    isChecking: false,
    lastChecked: null,
    error: null
  });
  const [showAlert, setShowAlert] = useState(false);

  const checkConnection = async () => {
    setConnectionStatus(prev => ({ ...prev, isChecking: true, error: null }));
    
    try {
      const response = await fetch(buildApiUrl('/health'), {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        setConnectionStatus({
          isConnected: true,
          isChecking: false,
          lastChecked: new Date(),
          error: null
        });
      } else {
        throw new Error('Servidor respondió con error');
      }
    } catch (error) {
      setConnectionStatus({
        isConnected: false,
        isChecking: false,
        lastChecked: new Date(),
        error: error.message
      });
      setShowAlert(true);
    }
  };

  // Verificar conexión al cargar el componente
  useEffect(() => {
    checkConnection();
    
    // Verificar cada 30 segundos
    const interval = setInterval(checkConnection, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (connectionStatus.isChecking) return 'info';
    if (connectionStatus.isConnected) return 'success';
    return 'error';
  };

  const getStatusIcon = () => {
    if (connectionStatus.isChecking) return <Refresh className="animate-spin" />;
    if (connectionStatus.isConnected) return <Wifi />;
    return <WifiOff />;
  };

  const getStatusText = () => {
    if (connectionStatus.isChecking) return 'Verificando...';
    if (connectionStatus.isConnected) return 'Conectado al Backend';
    return 'Modo Desarrollo';
  };

  const getTooltipText = () => {
    if (connectionStatus.isConnected) {
      return `Conectado al servidor backend\nÚltima verificación: ${connectionStatus.lastChecked?.toLocaleTimeString()}`;
    } else if (connectionStatus.error) {
      return `Error de conexión: ${connectionStatus.error}\nÚltima verificación: ${connectionStatus.lastChecked?.toLocaleTimeString()}`;
    } else {
      return 'Trabajando en modo de desarrollo\nLos datos se guardan localmente';
    }
  };

  return (
    <>
      <Tooltip title={getTooltipText()} arrow>
        <Chip
          icon={getStatusIcon()}
          label={getStatusText()}
          color={getStatusColor()}
          variant={connectionStatus.isConnected ? 'filled' : 'outlined'}
          onClick={checkConnection}
          clickable
          size="small"
        />
      </Tooltip>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="warning" 
          sx={{ width: '100%' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WifiOff sx={{ mr: 1 }} />
            <Box>
              <strong>Modo Desarrollo Activado</strong>
              <br />
              No se pudo conectar al backend. Los datos se guardan localmente.
            </Box>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
}

export default ConnectionStatus;
