import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Login as LoginIcon,
  VpnKey,
  CheckCircle,
  Security,
  Speed,
  Person,
  Phone,
  Email,
  Close
} from '@mui/icons-material';

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    licenseKey: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const handleChange = (field, value) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    setError(''); // Limpiar error al cambiar campos
  };

  const handleContactSales = () => {
    setContactDialogOpen(true);
  };

  const handleCloseContactDialog = () => {
    setContactDialogOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password || !credentials.licenseKey) {
      setError('Por favor complete todos los campos');
      return;
    }

    try {
      const result = await login(credentials);
      
      if (result.success) {
        setSuccess(result.message);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Error inesperado. Intente nuevamente.');
    }
  };

  // Licencias de ejemplo para mostrar
  const demoLicenses = [
    {
      key: 'DEMO-2024',
      type: 'Demo',
      features: ['Gestión básica', 'Reportes simples', 'Notificaciones'],
      maxEquipment: 100,
      price: 'Gratis (30 días)'
    },
    {
      key: 'PRO-2024',
      type: 'Profesional',
      features: ['Todas las funciones', 'Exportación', 'Soporte'],
      maxEquipment: 1000,
      price: '$20.000/mes'
    },
    {
      key: 'ENTERPRISE-2024',
      type: 'Empresarial',
      features: ['API', 'Soporte 24/7', 'Personalización'],
      maxEquipment: 10000,
      price: '$120.000/año'
    },
    {
      key: 'EMPRESA-2025',
      type: 'Empresarial Premium',
      features: ['Multi-tienda', 'Analytics Avanzado', 'Soporte Prioritario', 'API Completa'],
      maxEquipment: 50000,
      price: '$200.000/año'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            📱 Registro Móvil
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Sistema de Gestión de Equipos Móviles
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Acceda a su cuenta para gestionar su inventario
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Formulario de Login */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <LoginIcon color="primary" sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h4" component="h2">
                  Iniciar Sesión
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {success}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={credentials.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  margin="normal"
                  required
                  placeholder="admin@registromovil.com"
                  InputProps={{
                    startAdornment: <Speed sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />

                <TextField
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  margin="normal"
                  required
                  placeholder="••••••••"
                  InputProps={{
                    startAdornment: <Security sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                />

                <TextField
                  fullWidth
                  label="Clave de Licencia"
                  value={credentials.licenseKey}
                  onChange={(e) => handleChange('licenseKey', e.target.value)}
                  margin="normal"
                  required
                  placeholder="DEMO-2024"
                  InputProps={{
                    startAdornment: <VpnKey sx={{ mr: 1, color: 'text.secondary' }} />
                  }}
                  helperText="Ingrese su clave de licencia válida"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ mt: 3, mb: 2, py: 1.5 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Iniciar Sesión'
                  )}
                </Button>

                <Typography variant="body2" color="textSecondary" align="center">
                  ¿No tiene una cuenta?{' '}
                  <Button
                    color="primary"
                    onClick={() => navigate('/register')}
                    sx={{ textTransform: 'none' }}
                  >
                    Regístrese aquí
                  </Button>
                </Typography>
              </form>
            </Paper>
          </Grid>

          {/* Información de Licencias */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <VpnKey color="primary" sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h4" component="h2">
                  Planes de Licencia
                </Typography>
              </Box>

              <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
                Elija el plan que mejor se adapte a las necesidades de su negocio
              </Typography>

              <Grid container spacing={2}>
                {demoLicenses.map((license) => (
                  <Grid item xs={12} key={license.key}>
                    <Card 
                      variant="outlined"
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { 
                          borderColor: 'primary.main',
                          bgcolor: 'primary.50'
                        }
                      }}
                      onClick={() => handleChange('licenseKey', license.key)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="h6" component="h3">
                            {license.type}
                          </Typography>
                          <Chip 
                            label={license.price} 
                            color={license.type === 'Demo' ? 'default' : 'primary'}
                            variant={license.type === 'Demo' ? 'outlined' : 'filled'}
                          />
                        </Box>

                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          Máximo {license.maxEquipment.toLocaleString()} equipos
                        </Typography>

                        <Box sx={{ mt: 2 }}>
                          {license.features.map((feature, index) => (
                            <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                              <Typography variant="body2">{feature}</Typography>
                            </Box>
                          ))}
                        </Box>

                        {license.key === credentials.licenseKey && (
                          <Box sx={{ mt: 2, textAlign: 'center' }}>
                            <Chip 
                              label="Seleccionado" 
                              color="success" 
                              icon={<CheckCircle />}
                            />
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Información adicional */}
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  ¿Necesita un plan personalizado?
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Contáctenos para obtener un plan adaptado a sus necesidades específicas
                </Typography>
                <Button variant="outlined" color="primary" onClick={handleContactSales}>
                  Contactar Ventas
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" color="textSecondary">
            © 2024 Luismtnz Team. Todos los derechos reservados.
          </Typography>
          <Typography variant="caption" color="textSecondary" display="block">
            Sistema de gestión profesional para tiendas de equipos móviles
          </Typography>
        </Box>
      </Box>

      {/* Diálogo de Información de Contacto */}
      <Dialog 
        open={contactDialogOpen} 
        onClose={handleCloseContactDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Person color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Información de Contacto</Typography>
          </Box>
          <Button
            onClick={handleCloseContactDialog}
            color="inherit"
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <Close />
          </Button>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Luis Martínez Acuña
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Desarrollador y Soporte Técnico
            </Typography>
            
            <List>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Person color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Nombre Completo"
                  secondary="Luis Martínez Acuña"
                />
              </ListItem>
              
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Phone color="success" />
                </ListItemIcon>
                <ListItemText 
                  primary="Teléfono / WhatsApp"
                  secondary="3014566099"
                  secondaryTypographyProps={{
                    component: 'a',
                    href: 'tel:+573014566099',
                    sx: { color: 'success.main', textDecoration: 'none' }
                  }}
                />
              </ListItem>
              
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon>
                  <Email color="info" />
                </ListItemIcon>
                <ListItemText 
                  primary="Correo Electrónico"
                  secondary="luismtnz1988@gmail.com"
                  secondaryTypographyProps={{
                    component: 'a',
                    href: 'mailto:luismtnz1988@gmail.com',
                    sx: { color: 'info.main', textDecoration: 'none' }
                  }}
                />
              </ListItem>
            </List>
            
            <Box sx={{ mt: 3, p: 2, bgcolor: 'primary.50', borderRadius: 1 }}>
              <Typography variant="body2" color="primary" fontWeight="bold" gutterBottom>
                💼 Servicios Disponibles:
              </Typography>
              <Typography variant="body2" color="textSecondary">
                • Desarrollo de software personalizado<br/>
                • Soporte técnico especializado<br/>
                • Consultoría en sistemas de gestión<br/>
                • Implementación de soluciones empresariales
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={handleCloseContactDialog} 
            color="primary"
            variant="outlined"
          >
            Cerrar
          </Button>
          <Button 
            onClick={() => window.open('mailto:luismtnz1988@gmail.com', '_blank')}
            color="primary"
            variant="contained"
            startIcon={<Email />}
          >
            Enviar Email
          </Button>
          <Button 
            onClick={() => window.open('https://wa.me/573014566099', '_blank')}
            color="success"
            variant="contained"
            startIcon={<Phone />}
          >
            WhatsApp
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login;

