import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  VpnKey,
  CheckCircle,
  PendingActions,
  Refresh,
  Email,
  Phone,
  Schedule,
  Security
} from '@mui/icons-material';

function LicensePending() {
  const { 
    user, 
    licenseStatus, 
    licenseValidation, 
    validateLicense,
    logout 
  } = useAuth();
  
  const [isValidating, setIsValidating] = useState(false);

  const handleValidateLicense = async () => {
    setIsValidating(true);
    try {
      const result = await validateLicense();
      if (result.success) {
        // La licencia fue validada, el componente se ocultará automáticamente
      }
    } catch (error) {
      console.error('Error validando licencia:', error);
    } finally {
      setIsValidating(false);
    }
  };

  const getStatusInfo = () => {
    switch (licenseStatus) {
      case 'pending':
        return {
          title: 'Licencia Pendiente de Validación',
          description: 'Su cuenta está registrada pero requiere validación de licencia para acceder a todas las funcionalidades.',
          color: 'warning',
          icon: <PendingActions />
        };
      case 'expired':
        return {
          title: 'Licencia Expirada',
          description: 'Su licencia ha expirado. Contacte al administrador para renovarla.',
          color: 'error',
          icon: <Schedule />
        };
      case 'invalid':
        return {
          title: 'Licencia Inválida',
          description: 'La licencia asignada no es válida. Contacte al administrador.',
          color: 'error',
          icon: <Security />
        };
      default:
        return {
          title: 'Validación de Licencia',
          description: 'Verificando el estado de su licencia...',
          color: 'info',
          icon: <VpnKey />
        };
    }
  };

  const statusInfo = getStatusInfo();

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
            variant="outlined"
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
                  <Email color="primary" />
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
                  primary="Nombre"
                  secondary={user?.name}
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

        {/* Mensaje de Validación */}
        {licenseValidation.message && (
          <Alert severity={licenseValidation.isChecking ? 'info' : 'warning'} sx={{ mb: 3 }}>
            {licenseValidation.isChecking ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                <Typography>Validando licencia...</Typography>
              </Box>
            ) : (
              licenseValidation.message
            )}
          </Alert>
        )}

        {/* Instrucciones */}
        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              ¿Qué hacer ahora?
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="1. Contacte al administrador"
                  secondary="Envíe un email a luismtnz1988@gmail.com solicitando la activación de su licencia"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="2. Contacto telefónico"
                  secondary="Llame al 3014566099 para activación inmediata"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Refresh color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="3. Verificar estado"
                  secondary="Use el botón de abajo para verificar si su licencia ya fue activada"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        {/* Botones de Acción */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Refresh />}
            onClick={handleValidateLicense}
            disabled={isValidating || licenseValidation.isChecking}
            size="large"
          >
            {isValidating || licenseValidation.isChecking ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Verificando...
              </Box>
            ) : (
              'Verificar Licencia'
            )}
          </Button>
          
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Email />}
            onClick={() => window.open('mailto:luismtnz1988@gmail.com?subject=Activación de Licencia&body=Hola, solicito la activación de mi licencia para la cuenta: ' + user?.email, '_blank')}
            size="large"
          >
            Enviar Email
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Información de Contacto */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Contacto de Soporte
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Si necesita ayuda inmediata, contáctenos:
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<Email />}
              onClick={() => window.open('mailto:luismtnz1988@gmail.com', '_blank')}
            >
              Email
            </Button>
            <Button
              variant="outlined"
              startIcon={<Phone />}
              onClick={() => window.open('https://wa.me/573014566099', '_blank')}
            >
              WhatsApp
            </Button>
          </Box>
        </Box>

        {/* Botón de Logout */}
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="text"
            color="inherit"
            onClick={logout}
          >
            Cerrar Sesión
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default LicensePending;
