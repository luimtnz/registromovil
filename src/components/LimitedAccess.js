import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Button
} from '@mui/material';
import {
  Lock,
  Block,
  Warning,
  VpnKey,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

function LimitedAccess() {
  const { user, licenseStatus, getLicenseLimits } = useAuth();

  const getStatusInfo = () => {
    switch (licenseStatus) {
      case 'pending':
        return {
          title: 'Acceso Limitado - Licencia Pendiente',
          description: 'Su cuenta está registrada pero requiere validación de licencia.',
          color: 'warning',
          icon: <VpnKey />
        };
      case 'expired':
        return {
          title: 'Acceso Limitado - Licencia Expirada',
          description: 'Su licencia ha expirado. Renueve para acceder a todas las funcionalidades.',
          color: 'error',
          icon: <Warning />
        };
      case 'invalid':
        return {
          title: 'Acceso Denegado - Licencia Inválida',
          description: 'La licencia asignada no es válida.',
          color: 'error',
          icon: <Block />
        };
      default:
        return {
          title: 'Acceso Limitado',
          description: 'No tiene acceso completo a la aplicación.',
          color: 'warning',
          icon: <Lock />
        };
    }
  };

  const statusInfo = getStatusInfo();
  const limits = getLicenseLimits();

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box sx={{ 
              p: 2, 
              borderRadius: '50%', 
              bgcolor: `${statusInfo.color}.50`,
              color: `${statusInfo.color}.main`
            }}>
              {statusInfo.icon}
            </Box>
          </Box>
          
          <Typography variant="h4" component="h1" gutterBottom color={`${statusInfo.color}.main`}>
            {statusInfo.title}
          </Typography>
          
          <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
            {statusInfo.description}
          </Typography>

          <Chip 
            label={`Estado: ${licenseStatus.toUpperCase()}`}
            color={statusInfo.color}
            variant="filled"
          />
        </Box>

        {/* Información del Usuario */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Información de su Cuenta
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Email"
                  secondary={user?.email}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Tienda"
                  secondary={user?.storeName}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Limitaciones Actuales */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="error">
              Limitaciones Actuales
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Cancel color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Equipos"
                  secondary={`Máximo permitido: ${limits.maxEquipment} (actualmente: 0)`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Cancel color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Funcionalidades"
                  secondary={`Sin acceso a funciones avanzadas`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Cancel color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Sincronización"
                  secondary={`Sin acceso al backend`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Cancel color="error" />
                </ListItemIcon>
                <ListItemText 
                  primary="Reportes"
                  secondary={`Sin acceso a reportes y exportación`}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Funcionalidades Disponibles */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom color="success">
              Funcionalidades Disponibles
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Visualización de información"
                  secondary="Puede ver su información de cuenta"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Contacto de soporte"
                  secondary="Puede contactar para activar su licencia"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Verificación de estado"
                  secondary="Puede verificar el estado de su licencia"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Alertas */}
        <Alert severity={statusInfo.color} sx={{ mb: 3 }}>
          <Typography variant="body2">
            {licenseStatus === 'pending' && 
              'Su cuenta está registrada pero requiere validación de licencia. Contacte al administrador para activar su acceso completo.'
            }
            {licenseStatus === 'expired' && 
              'Su licencia ha expirado. Contacte al administrador para renovarla y recuperar el acceso completo.'
            }
            {licenseStatus === 'invalid' && 
              'La licencia asignada no es válida. Contacte al administrador para resolver este problema.'
            }
          </Typography>
        </Alert>

        <Divider sx={{ my: 3 }} />

        {/* Información de Contacto */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            ¿Necesita Activar su Licencia?
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Contacte al administrador para activar su licencia y obtener acceso completo:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.open('mailto:luismtnz1988@gmail.com?subject=Activación de Licencia&body=Hola, solicito la activación de mi licencia para la cuenta: ' + user?.email, '_blank')}
            >
              Enviar Email
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.open('https://wa.me/573014566099', '_blank')}
            >
              WhatsApp
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default LimitedAccess;
