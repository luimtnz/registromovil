import React from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Chip,
  Tooltip,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  CloudSync,
  CloudDone,
  WifiOff,
  Wifi,
  Sync,
  Warning
} from '@mui/icons-material';

function SyncStatus() {
  const { isOnline, isSyncing, lastSyncTime, syncWithBackend } = useData();
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const getSyncStatus = () => {
    if (!isOnline) {
      return {
        color: 'error',
        icon: <WifiOff />,
        label: 'Sin conexión',
        tooltip: 'No hay conexión a internet. Los datos se guardarán localmente y se sincronizarán cuando se restaure la conexión.'
      };
    }

    if (isSyncing) {
      return {
        color: 'info',
        icon: <CircularProgress size={16} />,
        label: 'Sincronizando...',
        tooltip: 'Sincronizando datos con el servidor...'
      };
    }

    if (lastSyncTime) {
      const lastSync = new Date(lastSyncTime);
      const now = new Date();
      const diffMinutes = Math.floor((now - lastSync) / (1000 * 60));

      if (diffMinutes < 5) {
        return {
          color: 'success',
          icon: <CloudDone />,
          label: 'Sincronizado',
          tooltip: `Última sincronización: hace ${diffMinutes} minutos`
        };
      } else if (diffMinutes < 30) {
        return {
          color: 'warning',
          icon: <CloudSync />,
          label: 'Pendiente',
          tooltip: `Última sincronización: hace ${diffMinutes} minutos`
        };
      } else {
        return {
          color: 'error',
          icon: <Warning />,
          label: 'Desactualizado',
          tooltip: `Última sincronización: hace ${diffMinutes} minutos. Haga clic para sincronizar.`
        };
      }
    }

    return {
      color: 'default',
      icon: <CloudSync />,
      label: 'No sincronizado',
      tooltip: 'Los datos no han sido sincronizados con el servidor. Haga clic para sincronizar.'
    };
  };

  const handleSyncClick = async () => {
    if (isOnline && !isSyncing) {
      await syncWithBackend();
    }
  };

  const status = getSyncStatus();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {/* Estado de conexión */}
      <Tooltip title={isOnline ? 'Conectado a internet' : 'Sin conexión a internet'}>
        <Chip
          icon={isOnline ? <Wifi /> : <WifiOff />}
          label={isOnline ? 'Online' : 'Offline'}
          color={isOnline ? 'success' : 'error'}
          size="small"
          variant="outlined"
        />
      </Tooltip>

      {/* Estado de sincronización */}
      <Tooltip title={status.tooltip}>
        <Chip
          icon={status.icon}
          label={status.label}
          color={status.color}
          size="small"
          variant="filled"
          clickable={!isSyncing && isOnline}
          onClick={handleSyncClick}
        />
      </Tooltip>

      {/* Botón de sincronización manual */}
      {isOnline && !isSyncing && (
        <Tooltip title="Sincronizar ahora">
          <IconButton
            size="small"
            onClick={handleSyncClick}
            color="primary"
          >
            <Sync />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default SyncStatus;
