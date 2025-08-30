import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Grid,
  IconButton,
  Tooltip,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Snackbar,
  Fab,
  Stepper,
  Step,
  StepLabel,
  StepContent
} from '@mui/material';
import { 
  Visibility, 
  TrendingUp, 
  Add, 
  ShoppingCart, 
  WhatsApp, 
  Print, 
  Delete,
  CheckCircle,
  Info
} from '@mui/icons-material';

function Sales() {
  // Estados principales
  const [sales, setSales] = useState([
    {
      id: 1,
      type: 'equipment',
      items: [{
        id: 1,
        type: 'equipment',
        brand: 'Samsung',
        model: 'Galaxy S21',
        color: 'Phantom Black',
        capacity: '128GB',
        salePrice: 1200000,
        quantity: 1
      }],
      clientInfo: {
        name: 'Juan Pérez',
        phone: '3001234567',
        email: 'juan@email.com',
        address: '',
        notes: 'Cliente satisfecho con la compra'
      },
      paymentInfo: {
        method: 'Efectivo',
        total: 1200000,
        discount: 0,
        finalTotal: 1200000
      },
      saleDate: '2024-01-25',
      status: 'completada',
      notes: 'Cliente satisfecho con la compra'
    },
    {
      id: 2,
      type: 'accessory',
      items: [{
        id: 1,
        type: 'accessory',
        name: 'Funda Samsung Galaxy S23',
        brand: 'Samsung',
        model: 'Galaxy S23',
        category: 'Fundas',
        salePrice: 12000,
        quantity: 2
      }],
      clientInfo: {
        name: 'María González',
        phone: '3009876543',
        email: 'maria@email.com',
        address: '',
        notes: 'Venta de accesorios'
      },
      paymentInfo: {
        method: 'Tarjeta',
        total: 24000,
        discount: 0,
        finalTotal: 24000
      },
      saleDate: '2024-01-26',
      status: 'completada',
      notes: 'Venta de accesorios'
    }
  ]);

  // Estados para nueva venta
  const [addSaleDialogOpen, setAddSaleDialogOpen] = useState(false);
  const [saleType, setSaleType] = useState('equipment'); // 'equipment' o 'accessory'
  const [activeStep, setActiveStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'Efectivo',
    total: 0,
    discount: 0,
    finalTotal: 0
  });

  // Estados para filtros y búsqueda
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Datos simulados de inventario (en un sistema real vendrían del DataContext)
  const [equipmentInventory] = useState([
    {
      id: 1,
      imei: '123456789012345',
      brand: 'Samsung',
      model: 'Galaxy S21',
      color: 'Phantom Black',
      capacity: '128GB',
      status: 'en_inventario',
      costPrice: 800000,
      salePrice: 1200000
    },
    {
      id: 2,
      imei: '555666777888999',
      brand: 'Xiaomi',
      model: 'Redmi Note 10',
      color: 'Ocean Blue',
      capacity: '128GB',
      status: 'en_inventario',
      costPrice: 500000,
      salePrice: 800000
    }
  ]);

  const [accessoriesInventory] = useState([
    {
      id: 1,
      name: 'Funda Samsung Galaxy S23',
      brand: 'Samsung',
      model: 'Galaxy S23',
      category: 'Fundas',
      stock: 25,
      costPrice: 5000,
      salePrice: 12000
    },
    {
      id: 2,
      name: 'Protector Pantalla iPhone 14',
      brand: 'Apple',
      model: 'iPhone 14',
      category: 'Protectores',
      stock: 40,
      costPrice: 3000,
      salePrice: 8000
    },
    {
      id: 3,
      name: 'Cargador USB-C 20W',
      brand: 'Generic',
      model: 'Universal',
      category: 'Cargadores',
      stock: 15,
      costPrice: 8000,
      salePrice: 18000
    }
  ]);

  // Funciones de utilidad
  const getStatusColor = (status) => {
    switch (status) {
      case 'completada': return 'success';
      case 'pendiente': return 'warning';
      case 'cancelada': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completada': return 'Completada';
      case 'pendiente': return 'Pendiente';
      case 'cancelada': return 'Cancelada';
      default: return status;
    }
  };

  const formatPrice = (price) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Funciones para nueva venta
  const handleAddSale = () => {
    setAddSaleDialogOpen(true);
    setActiveStep(0);
    setSelectedItems([]);
    setClientInfo({
      name: '',
      phone: '',
      email: '',
      address: '',
      notes: ''
    });
    setPaymentInfo({
      method: 'Efectivo',
      total: 0,
      discount: 0,
      finalTotal: 0
    });
  };

  const handleNextStep = () => {
    if (activeStep === 0 && selectedItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'Por favor selecciona al menos un producto',
        severity: 'error'
      });
      return;
    }
    if (activeStep === 1 && (!clientInfo.name || !clientInfo.phone)) {
      setSnackbar({
        open: true,
        message: 'Por favor completa la información del cliente',
        severity: 'error'
      });
      return;
    }
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBackStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleItemSelection = (item, type) => {
    if (type === 'equipment') {
      const existingIndex = selectedItems.findIndex(i => i.id === item.id && i.type === 'equipment');
      if (existingIndex >= 0) {
        setSelectedItems(selectedItems.filter((_, index) => index !== existingIndex));
      } else {
        setSelectedItems([...selectedItems, { ...item, type: 'equipment', quantity: 1 }]);
      }
    } else {
      const existingIndex = selectedItems.findIndex(i => i.id === item.id && i.type === 'accessory');
      if (existingIndex >= 0) {
        setSelectedItems(selectedItems.filter((_, index) => index !== existingIndex));
      } else {
        setSelectedItems([...selectedItems, { ...item, type: 'accessory', quantity: 1 }]);
      }
    }
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    setSelectedItems(selectedItems.map(item => 
      item.id === itemId ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const calculateTotals = useCallback(() => {
    const total = selectedItems.reduce((sum, item) => {
      if (item.type === 'equipment') {
        return sum + item.salePrice;
      } else {
        return sum + (item.salePrice * item.quantity);
      }
    }, 0);
    
    const finalTotal = total - paymentInfo.discount;
    
    setPaymentInfo(prev => ({
      ...prev,
      total,
      finalTotal: Math.max(0, finalTotal)
    }));
  }, [selectedItems, paymentInfo.discount]);

  useEffect(() => {
    calculateTotals();
  }, [calculateTotals]);

  const handleCompleteSale = () => {
    if (selectedItems.length === 0) {
      setSnackbar({
        open: true,
        message: 'No hay productos seleccionados',
        severity: 'error'
      });
      return;
    }

    const newSale = {
      id: sales.length + 1,
      type: selectedItems[0].type,
      items: selectedItems,
      clientInfo,
      paymentInfo,
      saleDate: new Date().toISOString().split('T')[0],
      status: 'completada',
      notes: clientInfo.notes
    };

    setSales([...sales, newSale]);
    
    setSnackbar({
      open: true,
      message: 'Venta registrada exitosamente',
      severity: 'success'
    });

    setAddSaleDialogOpen(false);
  };

  const handleWhatsApp = (clientPhone, saleInfo) => {
    if (!clientPhone || !saleInfo) return;
    
    const message = `🛒 *Confirmación de Venta*

${(saleInfo.items || []).map(item => 
  item.type === 'equipment' 
    ? `📱 ${item.brand || 'Sin marca'} ${item.model || 'Sin modelo'} - $${(item.salePrice || 0).toLocaleString()}`
    : `🔧 ${item.name || 'Sin nombre'} x${item.quantity || 1} - $${((item.salePrice || 0) * (item.quantity || 1)).toLocaleString()}`
).join('\n')}

💰 *Total:* $${(saleInfo.paymentInfo?.finalTotal || 0).toLocaleString()}
👤 *Cliente:* ${saleInfo.clientInfo?.name || 'Sin nombre'}
📅 *Fecha:* ${saleInfo.saleDate || 'Sin fecha'}

¡Gracias por tu compra! 🎉`;

    const whatsappUrl = `https://wa.me/57${clientPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };



  const filteredSales = sales.filter(sale => {
    // Validar que la venta tenga la estructura correcta
    if (!sale.clientInfo || !sale.items || !Array.isArray(sale.items)) {
      return false;
    }
    
    const matchesStatus = filterStatus === 'todos' || sale.status === filterStatus;
    const matchesSearch = 
      (sale.clientInfo.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sale.type === 'equipment' && sale.items.some(item => 
        (item.brand || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.model || '').toLowerCase().includes(searchTerm.toLowerCase())
      )) ||
      (sale.type === 'accessory' && sale.items.some(item => 
        (item.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.brand || '').toLowerCase().includes(searchTerm.toLowerCase())
      ));
    return matchesStatus && matchesSearch;
  });

  const getSalesStats = () => {
    const validSales = sales.filter(sale => 
      sale.clientInfo && sale.paymentInfo && sale.paymentInfo.finalTotal !== undefined
    );
    
    const totalSales = validSales.length;
    const totalRevenue = validSales.reduce((sum, sale) => sum + (sale.paymentInfo.finalTotal || 0), 0);
    const completedSales = validSales.filter(sale => sale.status === 'completada').length;
    const pendingSales = validSales.filter(sale => sale.status === 'pendiente').length;
    
    return { totalSales, totalRevenue, completedSales, pendingSales };
  };

  const stats = getSalesStats();

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <TrendingUp sx={{ mr: 2, verticalAlign: 'middle' }} />
          Gestión de Ventas
        </Typography>
        
        {/* Resumen de ventas */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'primary.50', border: '1px solid', borderColor: 'primary.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp color="primary" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="div" color="primary">
                      {stats.totalSales}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Ventas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'success.50', border: '1px solid', borderColor: 'success.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <ShoppingCart color="success" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="div" color="success.main">
                      {formatPrice(stats.totalRevenue)}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ingresos Totales
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'warning.50', border: '1px solid', borderColor: 'warning.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CheckCircle color="warning" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="div" color="warning.main">
                      {stats.completedSales}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ventas Completadas
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'info.50', border: '1px solid', borderColor: 'info.200' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Info color="info" sx={{ fontSize: 40, mr: 2 }} />
                  <Box>
                    <Typography variant="h6" component="div" color="info.main">
                      {stats.pendingSales}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Ventas Pendientes
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>



        {/* Filtros y búsqueda */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Buscar ventas"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Cliente, producto, marca..."
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  label="Estado"
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="completada">Completada</MenuItem>
                  <MenuItem value="pendiente">Pendiente</MenuItem>
                  <MenuItem value="cancelada">Cancelada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddSale}
                >
                  + Nueva Venta
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Tabla de ventas */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Cliente</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Productos</TableCell>
                <TableCell>Total</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {sale.clientInfo?.name || 'Sin nombre'}
                      </Typography>
                      {sale.clientInfo?.phone && (
                        <Typography variant="caption" color="textSecondary">
                          {sale.clientInfo.phone}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={sale.type === 'equipment' ? 'Equipo' : 'Accesorio'}
                      color={sale.type === 'equipment' ? 'primary' : 'secondary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box>
                      {sale.items?.map((item, index) => (
                        <Typography key={index} variant="body2">
                          {item.type === 'equipment' 
                            ? `${item.brand || 'Sin marca'} ${item.model || 'Sin modelo'}`
                            : `${item.name || 'Sin nombre'} x${item.quantity || 1}`
                          }
                        </Typography>
                      )) || 'Sin productos'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="bold" color="success.main">
                      {formatPrice(sale.paymentInfo?.finalTotal || 0)}
                    </Typography>
                  </TableCell>
                  <TableCell>{sale.saleDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatusText(sale.status)}
                      color={getStatusColor(sale.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="WhatsApp">
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleWhatsApp(sale.clientInfo?.phone, sale)}
                          disabled={!sale.clientInfo?.phone}
                        >
                          <WhatsApp />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Imprimir recibo">
                        <IconButton size="small" color="info">
                          <Print />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* FAB para nueva venta */}
        <Fab
          color="primary"
          aria-label="Nueva venta"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleAddSale}
        >
          <Add />
        </Fab>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert 
            onClose={() => setSnackbar({ ...snackbar, open: false })} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>

        {/* Dialog para nueva venta */}
        <Dialog 
          open={addSaleDialogOpen} 
          onClose={() => setAddSaleDialogOpen(false)} 
          maxWidth="lg" 
          fullWidth
        >
          <DialogTitle>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ShoppingCart color="primary" />
              Nueva Venta
            </Box>
          </DialogTitle>
          <DialogContent>
            <Stepper activeStep={activeStep} orientation="vertical" sx={{ mt: 2 }}>
              {/* Paso 1: Selección de productos */}
              <Step>
                <StepLabel>Selección de Productos</StepLabel>
                <StepContent>
                  <Box sx={{ mb: 3 }}>
                    <FormControl component="fieldset" sx={{ mb: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        Tipo de Venta
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Button
                            variant={saleType === 'equipment' ? 'contained' : 'outlined'}
                            onClick={() => setSaleType('equipment')}
                            startIcon={<TrendingUp />}
                          >
                            Equipos
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            variant={saleType === 'accessory' ? 'contained' : 'outlined'}
                            onClick={() => setSaleType('accessory')}
                            startIcon={<ShoppingCart />}
                          >
                            Accesorios
                          </Button>
                        </Grid>
                      </Grid>
                    </FormControl>

                    {saleType === 'equipment' ? (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Equipos Disponibles
                        </Typography>
                        <Grid container spacing={2}>
                          {equipmentInventory
                            .filter(item => item.status === 'en_inventario')
                            .map((item) => (
                              <Grid item xs={12} md={6} key={item.id}>
                                <Card 
                                  variant={selectedItems.some(i => i.id === item.id && i.type === 'equipment') ? 'elevation' : 'outlined'}
                                  sx={{ 
                                    cursor: 'pointer',
                                    border: selectedItems.some(i => i.id === item.id && i.type === 'equipment') ? 2 : 1,
                                    borderColor: selectedItems.some(i => i.id === item.id && i.type === 'equipment') ? 'primary.main' : 'divider'
                                  }}
                                  onClick={() => handleItemSelection(item, 'equipment')}
                                >
                                  <CardContent>
                                    <Typography variant="h6">
                                      {item.brand} {item.model}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      {item.color} • {item.capacity}
                                    </Typography>
                                    <Typography variant="h6" color="success.main" sx={{ mt: 1 }}>
                                      {formatPrice(item.salePrice)}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Accesorios Disponibles
                        </Typography>
                        <Grid container spacing={2}>
                          {accessoriesInventory
                            .filter(item => item.stock > 0)
                            .map((item) => (
                              <Grid item xs={12} md={6} key={item.id}>
                                <Card 
                                  variant={selectedItems.some(i => i.id === item.id && i.type === 'accessory') ? 'elevation' : 'outlined'}
                                  sx={{ 
                                    cursor: 'pointer',
                                    border: selectedItems.some(i => i.id === item.id && i.type === 'accessory') ? 2 : 1,
                                    borderColor: selectedItems.some(i => i.id === item.id && i.type === 'accessory') ? 'primary.main' : 'divider'
                                  }}
                                  onClick={() => handleItemSelection(item, 'accessory')}
                                >
                                  <CardContent>
                                    <Typography variant="h6">
                                      {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      {item.brand} • {item.category}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      Stock: {item.stock} unidades
                                    </Typography>
                                    <Typography variant="h6" color="success.main" sx={{ mt: 1 }}>
                                      {formatPrice(item.salePrice)}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                      </Box>
                    )}

                    {selectedItems.length > 0 && (
                      <Box sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          Productos Seleccionados
                        </Typography>
                        <List>
                          {selectedItems.map((item, index) => (
                            <ListItem key={index}>
                              <ListItemText
                                primary={item.type === 'equipment' 
                                  ? `${item.brand} ${item.model}`
                                  : `${item.name}`
                                }
                                secondary={item.type === 'equipment' 
                                  ? `${item.color} • ${item.capacity}`
                                  : `${item.brand} • ${item.category}`
                                }
                              />
                              <ListItemSecondaryAction>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  {item.type === 'accessory' && (
                                    <TextField
                                      type="number"
                                      label="Cantidad"
                                      value={item.quantity}
                                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                      inputProps={{ min: 1, max: item.stock }}
                                      sx={{ width: 100 }}
                                    />
                                  )}
                                  <Typography variant="h6" color="success.main">
                                    {item.type === 'equipment' 
                                      ? formatPrice(item.salePrice)
                                      : formatPrice(item.salePrice * item.quantity)
                                    }
                                  </Typography>
                                  <IconButton 
                                    color="error"
                                    onClick={() => setSelectedItems(selectedItems.filter((_, i) => i !== index))}
                                  >
                                    <Delete />
                                  </IconButton>
                                </Box>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={() => setAddSaleDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleNextStep}>
                      Siguiente
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              {/* Paso 2: Información del cliente */}
              <Step>
                <StepLabel>Información del Cliente</StepLabel>
                <StepContent>
                  <Grid container spacing={3} sx={{ mb: 3 }}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Nombre del Cliente *"
                        value={clientInfo.name}
                        onChange={(e) => setClientInfo({...clientInfo, name: e.target.value})}
                        required
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Teléfono *"
                        value={clientInfo.phone}
                        onChange={(e) => setClientInfo({...clientInfo, phone: e.target.value})}
                        required
                        placeholder="3001234567"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={clientInfo.email}
                        onChange={(e) => setClientInfo({...clientInfo, email: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Dirección"
                        value={clientInfo.address}
                        onChange={(e) => setClientInfo({...clientInfo, address: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Notas adicionales"
                        multiline
                        rows={3}
                        value={clientInfo.notes}
                        onChange={(e) => setClientInfo({...clientInfo, notes: e.target.value})}
                        placeholder="Información adicional del cliente..."
                      />
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={handleBackStep}>
                      Atrás
                    </Button>
                    <Button variant="contained" onClick={handleNextStep}>
                      Siguiente
                    </Button>
                  </Box>
                </StepContent>
              </Step>

              {/* Paso 3: Resumen y confirmación */}
              <Step>
                <StepLabel>Resumen y Confirmación</StepLabel>
                <StepContent>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Resumen de la Venta
                    </Typography>
                    
                    <Card sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          Productos
                        </Typography>
                        {selectedItems.map((item, index) => (
                          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>
                              {item.type === 'equipment' 
                                ? `${item.brand} ${item.model}`
                                : `${item.name} x${item.quantity}`
                              }
                            </Typography>
                            <Typography>
                              {item.type === 'equipment' 
                                ? formatPrice(item.salePrice)
                                : formatPrice(item.salePrice * item.quantity)
                              }
                            </Typography>
                          </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6">Subtotal:</Typography>
                          <Typography variant="h6">{formatPrice(paymentInfo.total)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography>Descuento:</Typography>
                          <Typography>{formatPrice(paymentInfo.discount)}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" color="success.main">Total Final:</Typography>
                          <Typography variant="h6" color="success.main">{formatPrice(paymentInfo.finalTotal)}</Typography>
                        </Box>
                      </CardContent>
                    </Card>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Método de Pago"
                          select
                          value={paymentInfo.method}
                          onChange={(e) => setPaymentInfo({...paymentInfo, method: e.target.value})}
                        >
                          <MenuItem value="Efectivo">Efectivo</MenuItem>
                          <MenuItem value="Tarjeta">Tarjeta</MenuItem>
                          <MenuItem value="Transferencia">Transferencia</MenuItem>
                          <MenuItem value="Nequi">Nequi</MenuItem>
                          <MenuItem value="Daviplata">Daviplata</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Descuento"
                          type="number"
                          value={paymentInfo.discount}
                          onChange={(e) => setPaymentInfo({...paymentInfo, discount: parseFloat(e.target.value) || 0})}
                          InputProps={{
                            startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button onClick={handleBackStep}>
                      Atrás
                    </Button>
                    <Button variant="contained" onClick={handleCompleteSale}>
                      Completar Venta
                    </Button>
                  </Box>
                </StepContent>
              </Step>
            </Stepper>
          </DialogContent>
        </Dialog>
      </Box>
    </Container>
  );
}

export default Sales;
