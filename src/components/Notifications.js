import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Button,
  Divider
} from '@mui/material';
import {
  NotificationsOff,
  CheckCircle,
  Info,
  Warning,
  Error
} from '@mui/icons-material';

function Notifications() {
  const { hasFeature } = useAuth();
  const { notifications, markNotificationAsRead, clearNotifications } = useData();
  
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [filteredNotifications, setFilteredNotifications] = useState([]);

  const filterNotifications = useCallback(() => {
    let filtered = [...notifications];
    
    switch (filter) {
      case 'unread':
        filtered = filtered.filter(n => !n.read);
        break;
      case 'read':
        filtered = filtered.filter(n => n.read);
        break;
      default:
        break;
    }
    
    // Ordenar por fecha (más recientes primero)
    filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    setFilteredNotifications(filtered);
  }, [notifications, filter]);

  useEffect(() => {
    filterNotifications();
  }, [filterNotifications]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'info':
        return <Info color="info" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'error':
        return <Error color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Hace unos minutos';
    } else if (diffInHours < 24) {
      return `Hace ${Math.floor(diffInHours)} horas`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    filteredNotifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
  };

  const handleClearAll = () => {
    clearNotifications();
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!hasFeature('notifications')) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <NotificationsOff color="disabled" sx={{ fontSize: 64, mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Funcionalidad No Disponible
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
              Las notificaciones están disponibles en planes superiores.
            </Typography>
            <Button variant="outlined" color="primary">
              Actualizar Licencia
            </Button>
          </Paper>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 3, mb: 4 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              label={`Todas (${notifications.length})`}
              color={filter === 'all' ? 'primary' : 'default'}
              onClick={() => setFilter('all')}
              clickable
            />
            <Chip
              label={`No Leídas (${unreadCount})`}
              color={filter === 'unread' ? 'primary' : 'default'}
              onClick={() => setFilter('unread')}
              clickable
            />
            <Chip
              label={`Leídas (${notifications.filter(n => n.read).length})`}
              color={filter === 'read' ? 'primary' : 'default'}
              onClick={() => setFilter('read')}
              clickable
            />
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Marcar Todo como Leído
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              Limpiar Todo
            </Button>
          </Box>
        </Box>

        {/* Filtros */}
        <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip
              label={`Todas (${notifications.length})`}
              color={filter === 'all' ? 'primary' : 'default'}
              onClick={() => setFilter('all')}
              clickable
            />
            <Chip
              label={`No Leídas (${unreadCount})`}
              color={filter === 'unread' ? 'primary' : 'default'}
              onClick={() => setFilter('unread')}
              clickable
            />
            <Chip
              label={`Leídas (${notifications.filter(n => n.read).length})`}
              color={filter === 'read' ? 'primary' : 'default'}
              onClick={() => setFilter('read')}
              clickable
            />
          </Box>
        </Paper>

        {/* Lista de notificaciones */}
        <Paper elevation={2}>
          {filteredNotifications.length === 0 ? (
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <NotificationsOff color="disabled" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {filter === 'all' ? 'No hay notificaciones' : 
                 filter === 'unread' ? 'No hay notificaciones sin leer' : 
                 'No hay notificaciones leídas'}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {filter === 'all' ? 'Las notificaciones aparecerán aquí cuando haya actividad en el sistema' :
                 filter === 'unread' ? 'Todas las notificaciones han sido leídas' :
                 'No hay notificaciones leídas para mostrar'}
              </Typography>
            </Box>
          ) : (
            <List>
              {filteredNotifications.map((notification, index) => (
                <React.Fragment key={notification.id}>
                  <ListItem
                    sx={{
                      bgcolor: notification.read ? 'transparent' : 'action.hover',
                      '&:hover': {
                        bgcolor: notification.read ? 'action.hover' : 'action.selected'
                      }
                    }}
                  >
                    <ListItemIcon>
                      {getNotificationIcon(notification.type)}
                    </ListItemIcon>
                    
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight={notification.read ? 'normal' : 'bold'}>
                            {notification.title}
                          </Typography>
                          {!notification.read && (
                            <Chip 
                              label="Nueva" 
                              size="small" 
                              color="primary" 
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            {notification.message}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" color="textSecondary">
                              {formatTimestamp(notification.timestamp)}
                            </Typography>
                            <Chip
                              label={notification.type}
                              size="small"
                              color={getNotificationColor(notification.type)}
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      }
                    />
                    
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      {!notification.read && (
                        <IconButton
                          size="small"
                          onClick={() => handleMarkAsRead(notification.id)}
                          color="primary"
                        >
                          <CheckCircle />
                        </IconButton>
                      )}
                    </Box>
                  </ListItem>
                  
                  {index < filteredNotifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Paper>

        {/* Estadísticas */}
        {notifications.length > 0 && (
          <Paper elevation={2} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumen de Notificaciones
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="primary">
                  {notifications.length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="error">
                  {unreadCount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  No Leídas
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="success">
                  {notifications.filter(n => n.read).length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Leídas
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="info">
                  {notifications.filter(n => n.type === 'success').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Éxitos
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h4" color="warning">
                  {notifications.filter(n => n.type === 'warning').length}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Advertencias
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}

export default Notifications;
