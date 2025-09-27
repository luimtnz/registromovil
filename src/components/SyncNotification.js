import React, { useEffect, useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Button,
  IconButton
} from '@mui/material';
import {
  CloudSync,
  CloudDone,
  CloudOff,
  Close,
  Sync
} from '@mui/icons-material';

function SyncNotification() {
  const { isOnline, isSyncing, lastSyncTime, syncWithBackend } = useData();
  const { user } = useAuth();
  
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'info',
    action: null
  });

  useEffect(() => {
    if (!user) return;

    // Notificar cuando se pierde la conexión
    if (!isOnline) {
      setNotification({
        open: true,
        message: 'Sin conexión a internet. Los datos se guardarán localmente.',
        severity: 'warning',
        action: null
      });
    }

    // Notificar cuando se restaura la conexión
    if (isOnline && lastSyncTime) {
      const lastSync = new Date(lastSyncTime);
      const now = new Date();
      const diffMinutes = Math.floor((now - lastSync) / (1000 * 60));

      if (diffMinutes > 5) {
        setNotification({
          open: true,
          message: `Última sincronización hace ${diffMinutes} minutos. ¿Desea sincronizar ahora?`,
          severity: 'info',
          action: (
            <Button
              color="inherit"
              size="small"
              onClick={async () => {
                await syncWithBackend();
                setNotification(prev => ({ ...prev, open: false }));
              }}
              startIcon={<Sync />}
            >
              Sincronizar
            </Button>
          )
        });
      }
    }
  }, [isOnline, lastSyncTime, user, syncWithBackend]);

  const handleClose = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  if (!user) {
    return null;
  }

  return (
    <Snackbar
      open={notification.open}
      autoHideDuration={isOnline ? 6000 : null}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={notification.severity}
        variant="filled"
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {notification.action}
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        }
        icon={
          isOnline ? 
            (isSyncing ? <CloudSync /> : <CloudDone />) : 
            <CloudOff />
        }
        sx={{ minWidth: '300px' }}
      >
        <Typography variant="body2">
          {notification.message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}

export default SyncNotification;
