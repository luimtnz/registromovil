import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import Receipt from './Receipt';

function UserRegister() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addEquipment, license } = useData();
  
  const defaultType = location.state?.defaultType || 'venta';

  const [equipment, setEquipment] = useState({
    imei: '',
    brand: '',
    model: '',
    type: defaultType,
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    distributorName: '',
    repairReason: '',
    status: 'en_reparacion',
    // Campos específicos para compra
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerDocument: '',
    purchasePrice: '',
    purchaseDate: ''
  });

  const [showReceipt, setShowReceipt] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Actualizar el tipo cuando cambie la navegación
  useEffect(() => {
    setEquipment(prev => ({ ...prev, type: defaultType }));
  }, [defaultType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validar campos obligatorios según el tipo
      if (equipment.type === 'compra') {
        if (!equipment.imei || !equipment.brand || !equipment.model ||
            !equipment.sellerName || !equipment.sellerPhone ||
            !equipment.sellerDocument || !equipment.purchasePrice ||
            !equipment.purchaseDate) {
          setError('Por favor, complete todos los campos obligatorios');
          return;
        }
      } else if (equipment.type === 'venta') {
        if (!equipment.imei || !equipment.brand || !equipment.model) {
          setError('Por favor, complete todos los campos obligatorios');
          return;
        }
      } else if (equipment.type === 'reparacion') {
        if (!equipment.imei || !equipment.brand || !equipment.model || !equipment.repairReason) {
          setError('Por favor, complete todos los campos obligatorios');
          return;
        }
      }

      // Preparar datos del equipo
      const equipmentData = {
        ...equipment,
        status: equipment.type === 'venta' ? 'en_inventario' : 
                equipment.type === 'reparacion' ? 'en_reparacion' : 'en_inventario',
        createdAt: new Date().toISOString()
      };

      // Agregar equipo usando el contexto
      const result = await addEquipment(equipmentData);
      
      if (result.success) {
        if (equipment.type === 'compra') {
          setSuccessMessage('¡Equipo registrado exitosamente! Mostrando recibo de compra...');
          setShowSuccess(true);
          // Mostrar recibo después de un breve delay
          setTimeout(() => {
            setShowReceipt(true);
          }, 1500);
        } else {
          setSuccessMessage('¡Equipo registrado exitosamente!');
          setShowSuccess(true);
        }

        // Limpiar formulario
        setEquipment({
          imei: '',
          brand: '',
          model: '',
          type: defaultType,
          clientName: '',
          clientPhone: '',
          clientEmail: '',
          distributorName: '',
          repairReason: '',
          status: 'en_reparacion',
          sellerName: '',
          sellerPhone: '',
          sellerEmail: '',
          sellerDocument: '',
          purchasePrice: '',
          purchaseDate: ''
        });
      } else {
        setError(result.error || 'Error al registrar el equipo');
      }
    } catch (error) {
      setError('Error inesperado. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setEquipment(prev => ({ ...prev, [field]: value }));
    setError(''); // Limpiar error al cambiar campos
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Si se está mostrando el recibo, no mostrar el formulario
  if (showReceipt) {
    return (
      <Receipt
        equipment={equipment}
        onClose={handleCloseReceipt}
      />
    );
  }

  // Obtener el título según el tipo
  const getTitle = () => {
    switch (equipment.type) {
      case 'venta': return '📱 Registrar Venta de Equipo';
      case 'compra': return '🛒 Registrar Compra de Equipo';
      case 'reparacion': return '🔧 Registrar Reparación de Equipo';
      default: return '📱 Registrar Equipo';
    }
  };

  // Obtener el color del botón según el tipo
  const getButtonColor = () => {
    switch (equipment.type) {
      case 'venta': return 'primary';
      case 'compra': return 'success';
      case 'reparacion': return 'warning';
      default: return 'primary';
    }
  };

  // Verificar si se puede registrar más equipos
  const canRegisterMore = !license || equipment.length < license.maxEquipment;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        {/* Header con botón de regreso */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackToDashboard}
            sx={{ mr: 2 }}
            color="inherit"
          >
            Volver al Dashboard
          </Button>
          <Typography variant="h4" component="h1" align="center" sx={{ flexGrow: 1 }}>
            {getTitle()}
          </Typography>
        </Box>

        {/* Advertencia de límite de licencia */}
        {!canRegisterMore && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            Ha alcanzado el límite de equipos de su licencia ({license.maxEquipment}). 
            Considere actualizar su licencia para registrar más equipos.
          </Alert>
        )}

        {/* Mostrar errores */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError('')}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Tipo de registro */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Tipo de Registro</InputLabel>
                <Select
                  value={equipment.type}
                  onChange={(e) => handleChange('type', e.target.value)}
                  label="Tipo de Registro"
                >
                  <MenuItem value="venta">Venta</MenuItem>
                  <MenuItem value="reparacion">Reparación</MenuItem>
                  <MenuItem value="compra">Compra</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Campos básicos del equipo */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="IMEI"
                value={equipment.imei}
                onChange={(e) => handleChange('imei', e.target.value)}
                required
                placeholder="123456789012345"
                helperText="Ingrese el IMEI del equipo móvil"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Marca"
                value={equipment.brand}
                onChange={(e) => handleChange('brand', e.target.value)}
                required
                placeholder="Samsung, iPhone, Xiaomi, etc."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Modelo"
                value={equipment.model}
                onChange={(e) => handleChange('model', e.target.value)}
                required
                placeholder="Galaxy S21, iPhone 13, etc."
              />
            </Grid>

            {/* Campos específicos para venta */}
            {equipment.type === 'venta' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                    Información del Cliente
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Cliente"
                    value={equipment.clientName}
                    onChange={(e) => handleChange('clientName', e.target.value)}
                    placeholder="Nombre completo"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono del Cliente"
                    value={equipment.clientPhone}
                    onChange={(e) => handleChange('clientPhone', e.target.value)}
                    placeholder="3001234567"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email del Cliente"
                    type="email"
                    value={equipment.clientEmail}
                    onChange={(e) => handleChange('clientEmail', e.target.value)}
                    placeholder="cliente@email.com"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre del Distribuidor (opcional)"
                    value={equipment.distributorName}
                    onChange={(e) => handleChange('distributorName', e.target.value)}
                    placeholder="Si es de distribuidor, deje vacío el nombre del cliente"
                    helperText="Si es de distribuidor, complete solo este campo"
                  />
                </Grid>
              </>
            )}

            {/* Campos específicos para reparación */}
            {equipment.type === 'reparacion' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                    Información de la Reparación
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Motivo de la Reparación"
                    value={equipment.repairReason}
                    onChange={(e) => handleChange('repairReason', e.target.value)}
                    required
                    multiline
                    rows={3}
                    placeholder="Describa el problema del equipo..."
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Estado</InputLabel>
                    <Select
                      value={equipment.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      label="Estado"
                    >
                      <MenuItem value="en_reparacion">En Reparación</MenuItem>
                      <MenuItem value="pendiente">Pendiente</MenuItem>
                      <MenuItem value="entregado">Entregado</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}

            {/* Campos específicos para compra */}
            {equipment.type === 'compra' && (
              <>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
                    Información del Vendedor
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nombre del Vendedor"
                    value={equipment.sellerName}
                    onChange={(e) => handleChange('sellerName', e.target.value)}
                    required
                    placeholder="Nombre completo"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Teléfono del Vendedor"
                    value={equipment.sellerPhone}
                    onChange={(e) => handleChange('sellerPhone', e.target.value)}
                    required
                    placeholder="3001234567"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Documento del Vendedor"
                    value={equipment.sellerDocument}
                    onChange={(e) => handleChange('sellerDocument', e.target.value)}
                    required
                    placeholder="12345678"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email del Vendedor"
                    type="email"
                    value={equipment.sellerEmail}
                    onChange={(e) => handleChange('sellerEmail', e.target.value)}
                    placeholder="vendedor@email.com"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Precio de Compra"
                    value={equipment.purchasePrice}
                    onChange={(e) => handleChange('purchasePrice', e.target.value)}
                    required
                    type="number"
                    placeholder="500000"
                    helperText="Precio en pesos colombianos"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Fecha de Compra"
                    type="date"
                    value={equipment.purchaseDate}
                    onChange={(e) => handleChange('purchaseDate', e.target.value)}
                    required
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </>
            )}

            {/* Botones de acción */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleBackToDashboard}
                  size="large"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color={getButtonColor()}
                  size="large"
                  disabled={loading || !canRegisterMore}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    equipment.type === 'compra' ? 'Registrar Compra' : 
                    equipment.type === 'reparacion' ? 'Registrar Reparación' : 
                    'Registrar Venta'
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {/* Snackbar para mensajes de éxito */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success">
            {successMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
}

export default UserRegister;
