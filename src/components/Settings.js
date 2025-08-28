import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Business,
  Person,
  Security,
  Notifications,
  Save,
  Refresh
} from '@mui/icons-material';

function Settings() {
  const [settings, setSettings] = useState({
    // Configuración de empresa
    companyName: 'Registro Móvil',
    companyAddress: 'Calle Principal #123, Bogotá',
    companyPhone: '3001234567',
    companyEmail: 'info@registromovil.com',
    companyTaxId: '900123456-7',
    
    // Configuración de usuario
    userName: 'Administrador',
    userEmail: 'admin@registromovil.com',
    userRole: 'admin',
    
    // Configuración del sistema
    currency: 'COP',
    language: 'es',
    timezone: 'America/Bogota',
    
    // Notificaciones
    emailNotifications: true,
    smsNotifications: false,
    lowStockAlerts: true,
    repairUpdates: true,
    
    // Seguridad
    sessionTimeout: 30,
    requirePasswordChange: true,
    twoFactorAuth: false
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Simular guardado
    console.log('Configuración guardada:', settings);
    setShowSuccess(true);
  };

  const handleReset = () => {
    // Resetear a valores por defecto
    setSettings({
      companyName: 'Registro Móvil',
      companyAddress: 'Calle Principal #123, Bogotá',
      companyPhone: '3001234567',
      companyEmail: 'info@registromovil.com',
      companyTaxId: '900123456-7',
      userName: 'Administrador',
      userEmail: 'admin@registromovil.com',
      userRole: 'admin',
      currency: 'COP',
      language: 'es',
      timezone: 'America/Bogota',
      emailNotifications: true,
      smsNotifications: false,
      lowStockAlerts: true,
      repairUpdates: true,
      sessionTimeout: 30,
      requirePasswordChange: true,
      twoFactorAuth: false
    });
    setShowError(true);
  };

  return (
    <Container maxWidth="xl">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ⚙️ Configuración del Sistema
        </Typography>

        <Grid container spacing={3}>
          {/* Configuración de Empresa */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Business color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Información de la Empresa
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de la Empresa"
                      value={settings.companyName}
                      onChange={(e) => handleChange('companyName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      value={settings.companyAddress}
                      onChange={(e) => handleChange('companyAddress', e.target.value)}
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={settings.companyPhone}
                      onChange={(e) => handleChange('companyPhone', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={settings.companyEmail}
                      onChange={(e) => handleChange('companyEmail', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="NIT/RUT"
                      value={settings.companyTaxId}
                      onChange={(e) => handleChange('companyTaxId', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Configuración de Usuario */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person color="secondary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Configuración de Usuario
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nombre de Usuario"
                      value={settings.userName}
                      onChange={(e) => handleChange('userName', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={settings.userEmail}
                      onChange={(e) => handleChange('userEmail', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Rol de Usuario</InputLabel>
                      <Select
                        value={settings.userRole}
                        onChange={(e) => handleChange('userRole', e.target.value)}
                        label="Rol de Usuario"
                      >
                        <MenuItem value="admin">Administrador</MenuItem>
                        <MenuItem value="manager">Gerente</MenuItem>
                        <MenuItem value="operator">Operador</MenuItem>
                        <MenuItem value="viewer">Visualizador</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Configuración del Sistema */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Business color="info" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Configuración del Sistema
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Moneda</InputLabel>
                      <Select
                        value={settings.currency}
                        onChange={(e) => handleChange('currency', e.target.value)}
                        label="Moneda"
                      >
                        <MenuItem value="COP">Peso Colombiano (COP)</MenuItem>
                        <MenuItem value="USD">Dólar Estadounidense (USD)</MenuItem>
                        <MenuItem value="EUR">Euro (EUR)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Idioma</InputLabel>
                      <Select
                        value={settings.language}
                        onChange={(e) => handleChange('language', e.target.value)}
                        label="Idioma"
                      >
                        <MenuItem value="es">Español</MenuItem>
                        <MenuItem value="en">English</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Zona Horaria</InputLabel>
                      <Select
                        value={settings.timezone}
                        onChange={(e) => handleChange('timezone', e.target.value)}
                        label="Zona Horaria"
                      >
                        <MenuItem value="America/Bogota">Bogotá (GMT-5)</MenuItem>
                        <MenuItem value="America/New_York">Nueva York (GMT-5/-4)</MenuItem>
                        <MenuItem value="Europe/Madrid">Madrid (GMT+1/+2)</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Notificaciones */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Notifications color="warning" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Configuración de Notificaciones
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.emailNotifications}
                          onChange={(e) => handleChange('emailNotifications', e.target.checked)}
                        />
                      }
                      label="Notificaciones por Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.smsNotifications}
                          onChange={(e) => handleChange('smsNotifications', e.target.checked)}
                        />
                      }
                      label="Notificaciones por SMS"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.lowStockAlerts}
                          onChange={(e) => handleChange('lowStockAlerts', e.target.checked)}
                        />
                      }
                      label="Alertas de Stock Bajo"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.repairUpdates}
                          onChange={(e) => handleChange('repairUpdates', e.target.checked)}
                        />
                      }
                      label="Actualizaciones de Reparaciones"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Seguridad */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Security color="error" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    Configuración de Seguridad
                  </Typography>
                </Box>
                
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel>Tiempo de Sesión (minutos)</InputLabel>
                      <Select
                        value={settings.sessionTimeout}
                        onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                        label="Tiempo de Sesión (minutos)"
                      >
                        <MenuItem value={15}>15 minutos</MenuItem>
                        <MenuItem value={30}>30 minutos</MenuItem>
                        <MenuItem value={60}>1 hora</MenuItem>
                        <MenuItem value={120}>2 horas</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.requirePasswordChange}
                          onChange={(e) => handleChange('requirePasswordChange', e.target.checked)}
                        />
                      }
                      label="Requerir Cambio de Contraseña"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={settings.twoFactorAuth}
                          onChange={(e) => handleChange('twoFactorAuth', e.target.checked)}
                        />
                      }
                      label="Autenticación de Dos Factores"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Botones de acción */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            color="primary"
            size="large"
          >
            Guardar Configuración
          </Button>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleReset}
            color="secondary"
            size="large"
          >
            Restaurar Valores
          </Button>
        </Box>
      </Paper>

      {/* Snackbars de notificación */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowSuccess(false)} severity="success">
          Configuración guardada exitosamente
        </Alert>
      </Snackbar>

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowError(false)} severity="info">
          Configuración restaurada a valores por defecto
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Settings;
