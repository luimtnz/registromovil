import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  List, ListItem, ListItemText, ListItemIcon,
  Divider, Typography, Box, Avatar, Chip,
  Menu, MenuItem, IconButton
} from '@mui/material';
import {
  Dashboard, Phone, Build, Inventory, ShoppingCart,
  Person, Settings, ExitToApp, Assessment, Notifications,
  QrCodeScanner, VpnKey, AccountCircle, ExpandMore, Store
} from '@mui/icons-material';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, license, logout, hasFeature } = useAuth();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [licenseMenuAnchor, setLicenseMenuAnchor] = useState(null);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLicenseMenuOpen = (event) => {
    setLicenseMenuAnchor(event.currentTarget);
  };

  const handleLicenseMenuClose = () => {
    setLicenseMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    handleUserMenuClose();
  };

  const getLicenseColor = () => {
    if (!license) return 'default';
    switch (license.type) {
      case 'demo': return 'default';
      case 'professional': return 'primary';
      case 'enterprise': return 'secondary';
      default: return 'default';
    }
  };

  const getLicenseLabel = () => {
    if (!license) return 'Sin Licencia';
    switch (license.type) {
      case 'demo': return 'Demo';
      case 'professional': return 'Pro';
      case 'enterprise': return 'Enterprise';
      default: return 'Básica';
    }
  };

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <Box sx={{
      width: 250,
      bgcolor: 'background.paper',
      borderRight: 1,
      borderColor: 'divider',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Logo/Title */}
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant="h5" component="h1" color="primary" fontWeight="bold">
          📱 REGISTRO MÓVIL
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Sistema de Gestión de Equipos
        </Typography>
      </Box>

      {/* Información del Usuario */}
      {user && (
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
              {user.name.charAt(0)}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {user.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {user.storeName}
              </Typography>
            </Box>
            <IconButton size="small" onClick={handleUserMenuOpen}>
              <ExpandMore />
            </IconButton>
          </Box>

          {/* Información de Licencia */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              icon={<VpnKey />}
              label={getLicenseLabel()}
              color={getLicenseColor()}
              size="small"
              variant="outlined"
              onClick={handleLicenseMenuOpen}
              sx={{ cursor: 'pointer' }}
            />
            <Typography variant="caption" color="textSecondary">
              {license?.maxEquipment?.toLocaleString()} equipos
            </Typography>
          </Box>
        </Box>
      )}

      {/* Menú de Usuario */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: { minWidth: 200 }
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <AccountCircle fontSize="small" />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Configuración
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>

      {/* Menú de Licencia */}
      <Menu
        anchorEl={licenseMenuAnchor}
        open={Boolean(licenseMenuAnchor)}
        onClose={handleLicenseMenuClose}
        PaperProps={{
          sx: { minWidth: 300 }
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Información de Licencia
          </Typography>
          {license ? (
            <>
              <Typography variant="body2" color="textSecondary">
                <strong>Tipo:</strong> {getLicenseLabel()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Clave:</strong> {license.key}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Expira:</strong> {new Date(license.expiresAt).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Límite:</strong> {license.maxEquipment.toLocaleString()} equipos
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  <strong>Funciones:</strong>
                </Typography>
                {license.features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    size="small"
                    variant="outlined"
                    sx={{ mr: 0.5, mb: 0.5 }}
                  />
                ))}
              </Box>
            </>
          ) : (
            <Typography variant="body2" color="error">
              No hay licencia activa
            </Typography>
          )}
        </Box>
      </Menu>

      {/* Navegación Principal */}
      <List component="nav" sx={{ pt: 2, flexGrow: 1 }}>
        <ListItem 
          button 
          component={Link} 
          to="/dashboard"
          selected={isActiveRoute('/dashboard')}
        >
          <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <Typography variant="overline" sx={{ px: 3, py: 1, color: 'textSecondary' }}>
          Gestión de Equipos
        </Typography>

        <ListItem 
          button 
          component={Link} 
          to="/user-register"
          selected={isActiveRoute('/user-register')}
        >
          <ListItemIcon><Phone color="primary" /></ListItemIcon>
          <ListItemText primary="Registrar Equipo" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/inventory"
          selected={isActiveRoute('/inventory')}
        >
          <ListItemIcon><Inventory color="info" /></ListItemIcon>
          <ListItemText primary="Inventario" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <Typography variant="overline" sx={{ px: 3, py: 1, color: 'textSecondary' }}>
          Operaciones
        </Typography>

        <ListItem 
          button 
          component={Link} 
          to="/sales"
          selected={isActiveRoute('/sales')}
        >
          <ListItemIcon><Phone color="success" /></ListItemIcon>
          <ListItemText primary="Ventas" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/purchases"
          selected={isActiveRoute('/purchases')}
        >
          <ListItemIcon><ShoppingCart color="success" /></ListItemIcon>
          <ListItemText primary="Compras" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/repairs"
          selected={isActiveRoute('/repairs')}
        >
          <ListItemIcon><Build color="warning" /></ListItemIcon>
          <ListItemText primary="Reparaciones" />
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <Typography variant="overline" sx={{ px: 3, py: 1, color: 'textSecondary' }}>
          Funcionalidades Avanzadas
        </Typography>

        <ListItem 
          button 
          component={Link} 
          to="/reports"
          selected={isActiveRoute('/reports')}
          disabled={!hasFeature('reports')}
        >
          <ListItemIcon><Assessment color="info" /></ListItemIcon>
          <ListItemText primary="Reportes" />
          {!hasFeature('reports') && (
            <Chip label="Pro" size="small" color="primary" variant="outlined" />
          )}
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/notifications"
          selected={isActiveRoute('/notifications')}
          disabled={!hasFeature('notifications')}
        >
          <ListItemIcon><Notifications color="warning" /></ListItemIcon>
          <ListItemText primary="Notificaciones" />
          {!hasFeature('notifications') && (
            <Chip label="Pro" size="small" color="primary" variant="outlined" />
          )}
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/mobile-features"
          selected={isActiveRoute('/mobile-features')}
          disabled={!hasFeature('mobile')}
        >
          <ListItemIcon><QrCodeScanner color="success" /></ListItemIcon>
          <ListItemText primary="Funciones Móviles" />
          {!hasFeature('mobile') && (
            <Chip label="Enterprise" size="small" color="secondary" variant="outlined" />
          )}
        </ListItem>

        <Divider sx={{ my: 1 }} />

        <Typography variant="overline" sx={{ px: 3, py: 1, color: 'textSecondary' }}>
          Administración
        </Typography>

        <ListItem 
          button 
          component={Link} 
          to="/clients"
          selected={isActiveRoute('/clients')}
        >
          <ListItemIcon><Person color="action" /></ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/accessories"
          selected={isActiveRoute('/accessories')}
        >
          <ListItemIcon><Store color="primary" /></ListItemIcon>
          <ListItemText primary="Accesorios" />
        </ListItem>

        <ListItem 
          button 
          component={Link} 
          to="/settings"
          selected={isActiveRoute('/settings')}
        >
          <ListItemIcon><Settings color="action" /></ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
      </List>

      {/* Footer con información de licencia */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
        <Typography variant="caption" color="textSecondary" display="block">
          Licencia: {getLicenseLabel()}
        </Typography>
        {license && (
          <Typography variant="caption" color="textSecondary" display="block">
            Expira: {new Date(license.expiresAt).toLocaleDateString()}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default Sidebar;
