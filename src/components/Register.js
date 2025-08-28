import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import {
  PersonAdd,
  Store,
  CheckCircle,
  Business,
  Phone,
  Email,
  LocationOn
} from '@mui/icons-material';

function Register() {
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    storeName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    businessType: '',
    estimatedEquipment: '',
    selectedPlan: 'DEMO-2024'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const steps = [
    {
      label: 'Información de la Tienda',
      description: 'Complete los datos básicos de su negocio'
    },
    {
      label: 'Selección de Plan',
      description: 'Elija el plan que mejor se adapte a sus necesidades'
    },
    {
      label: 'Confirmación',
      description: 'Revise y confirme su registro'
    }
  ];

  const plans = [
    {
      key: 'DEMO-2024',
      name: 'Plan Demo',
      description: 'Perfecto para probar el sistema',
      features: [
        'Gestión básica de equipos',
        'Registro de ventas y reparaciones',
        'Reportes simples',
        'Notificaciones básicas',
        'Soporte por email'
      ],
      maxEquipment: 100,
      price: 'Gratis',
      duration: '30 días',
      color: 'default'
    },
    {
      key: 'PRO-2024',
      name: 'Plan Profesional',
      description: 'Ideal para tiendas en crecimiento',
      features: [
        'Todas las funciones del plan Demo',
        'Hasta 1,000 equipos',
        'Reportes avanzados',
        'Exportación de datos',
        'Soporte prioritario',
        'Backup automático'
      ],
      maxEquipment: 1000,
      price: '$20.000',
      duration: 'por mes',
      color: 'primary'
    },
    {
      key: 'ENTERPRISE-2024',
      name: 'Plan Empresarial',
      description: 'Para cadenas y grandes operaciones',
      features: [
        'Todas las funciones del plan Pro',
        'Hasta 10,000 equipos',
        'API personalizada',
        'Soporte 24/7',
        'Implementación personalizada',
        'Capacitación del equipo'
      ],
      maxEquipment: 10000,
      price: '$120.000',
      duration: 'por año',
      color: 'secondary'
    }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!formData.storeName || !formData.ownerName || !formData.email) {
        setError('Por favor complete todos los campos obligatorios');
        return;
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    try {
      // Simular envío de formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess('¡Registro exitoso! Recibirá un email con su clave de licencia en los próximos minutos.');
      
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError('Error al procesar el registro. Intente nuevamente.');
    }
  };

  const getSelectedPlan = () => plans.find(p => p.key === formData.selectedPlan);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom color="primary">
            🚀 Registro de Tienda
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Únase a Registro Móvil y optimice su negocio
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
            Complete el formulario para obtener acceso al sistema
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Formulario de Registro */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PersonAdd color="primary" sx={{ mr: 2, fontSize: 32 }} />
                <Typography variant="h4" component="h2">
                  Registro de Tienda
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

              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography variant="h6">{step.label}</Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography color="textSecondary" sx={{ mb: 2 }}>
                        {step.description}
                      </Typography>

                      {/* Paso 1: Información de la Tienda */}
                      {index === 0 && (
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Nombre de la Tienda *"
                              value={formData.storeName}
                              onChange={(e) => handleChange('storeName', e.target.value)}
                              margin="normal"
                              required
                              InputProps={{
                                startAdornment: <Store sx={{ mr: 1, color: 'text.secondary' }} />
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Nombre del Propietario *"
                              value={formData.ownerName}
                              onChange={(e) => handleChange('ownerName', e.target.value)}
                              margin="normal"
                              required
                              InputProps={{
                                startAdornment: <Business sx={{ mr: 1, color: 'text.secondary' }} />
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Email *"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              margin="normal"
                              required
                              InputProps={{
                                startAdornment: <Email sx={{ mr: 1, color: 'text.secondary' }} />
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Teléfono"
                              value={formData.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              margin="normal"
                              InputProps={{
                                startAdornment: <Phone sx={{ mr: 1, color: 'text.secondary' }} />
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              fullWidth
                              label="Dirección"
                              value={formData.address}
                              onChange={(e) => handleChange('address', e.target.value)}
                              margin="normal"
                              multiline
                              rows={2}
                              InputProps={{
                                startAdornment: <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Tipo de Negocio"
                              value={formData.businessType}
                              onChange={(e) => handleChange('businessType', e.target.value)}
                              margin="normal"
                              placeholder="Venta, Reparación, Mixto"
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Equipos Estimados"
                              type="number"
                              value={formData.estimatedEquipment}
                              onChange={(e) => handleChange('estimatedEquipment', e.target.value)}
                              margin="normal"
                              placeholder="100"
                              helperText="Número aproximado de equipos que maneja"
                            />
                          </Grid>
                        </Grid>
                      )}

                      {/* Paso 2: Selección de Plan */}
                      {index === 1 && (
                        <Grid container spacing={2}>
                          {plans.map((plan) => (
                            <Grid item xs={12} key={plan.key}>
                              <Card 
                                variant={formData.selectedPlan === plan.key ? "elevation" : "outlined"}
                                sx={{ 
                                  cursor: 'pointer',
                                  borderColor: formData.selectedPlan === plan.key ? 'primary.main' : undefined,
                                  bgcolor: formData.selectedPlan === plan.key ? 'primary.50' : undefined,
                                  '&:hover': { 
                                    borderColor: 'primary.main',
                                    bgcolor: 'primary.50'
                                  }
                                }}
                                onClick={() => handleChange('selectedPlan', plan.key)}
                              >
                                <CardContent>
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                    <Typography variant="h6" component="h3">
                                      {plan.name}
                                    </Typography>
                                    <Chip 
                                      label={`${plan.price} ${plan.duration}`}
                                      color={plan.color}
                                      variant="filled"
                                    />
                                  </Box>
                                  
                                  <Typography variant="body2" color="textSecondary" gutterBottom>
                                    {plan.description}
                                  </Typography>
                                  
                                  <Typography variant="body2" color="textSecondary" gutterBottom>
                                    Máximo {plan.maxEquipment.toLocaleString()} equipos
                                  </Typography>

                                  <Box sx={{ mt: 2 }}>
                                    {plan.features.map((feature, featureIndex) => (
                                      <Box key={featureIndex} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <CheckCircle color="success" sx={{ fontSize: 16, mr: 1 }} />
                                        <Typography variant="body2">{feature}</Typography>
                                      </Box>
                                    ))}
                                  </Box>

                                  {formData.selectedPlan === plan.key && (
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
                      )}

                      {/* Paso 3: Confirmación */}
                      {index === 2 && (
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            Resumen del Registro
                          </Typography>
                          
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Tienda:</strong> {formData.storeName}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Propietario:</strong> {formData.ownerName}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Email:</strong> {formData.email}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Typography variant="body2" color="textSecondary">
                                <strong>Plan:</strong> {getSelectedPlan()?.name}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Box sx={{ mt: 3, p: 2, bgcolor: 'success.50', borderRadius: 1 }}>
                            <Typography variant="body2" color="success.main">
                              <strong>Próximos pasos:</strong>
                            </Typography>
                            <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                              1. Recibirá un email con su clave de licencia
                            </Typography>
                            <Typography variant="body2" color="success.main">
                              2. Use esa clave para iniciar sesión en el sistema
                            </Typography>
                            <Typography variant="body2" color="success.main">
                              3. Comience a gestionar su inventario inmediatamente
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      <Box sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                          sx={{ mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Completar Registro' : 'Continuar'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Atrás
                        </Button>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>

          {/* Información lateral */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                ¿Por qué elegir Registro Móvil?
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Sistema profesional y confiable</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Interfaz intuitiva y fácil de usar</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Soporte técnico especializado</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Actualizaciones regulares</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CheckCircle color="success" sx={{ mr: 1 }} />
                  <Typography variant="body2">Seguridad de datos garantizada</Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" gutterBottom>
                ¿Ya tiene una cuenta?
              </Typography>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ mt: 1 }}
              >
                Iniciar Sesión
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Register;
