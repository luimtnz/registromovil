import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import SyncStatus from './SyncStatus';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Card,
  CardContent,
  Fab,
  Snackbar,

} from '@mui/material';
import {
  Edit,
  Visibility,
  Phone,
  Build,
  ShoppingCart,
  Add,
  QrCode,
  QrCodeScanner,
  Warning,
  Print,
  WhatsApp,
  Storage
} from '@mui/icons-material';
import { QRCodeSVG } from 'qrcode.react';

function Inventory() {
  const navigate = useNavigate();
  const { equipment } = useData();
  
  // Estado del inventario mejorado (datos de ejemplo para cuando no hay datos)
  const sampleEquipment = [
    {
      id: 1,
      imei1: '123456789012345',
      imei2: '987654321098765',
      brand: 'Samsung',
      model: 'Galaxy S21',
      type: 'venta',
      category: 'smartphone',
      color: 'Phantom Black',
      capacity: '128GB',
      condition: 'excelente',
      clientName: 'Juan Pérez',
      clientPhone: '3001234567',
      clientEmail: 'juan@email.com',
      distributorName: '',
      status: 'vendido',
      date: '2024-01-15',
      price: '1200000',
      stockLevel: 0,
      minStockLevel: 5,
      qrCode: 'EQ001',
      photos: [],
      warranty: '12 meses',
      notes: 'Equipo en perfecto estado'
    },
    {
      id: 2,
      imei1: '987654321098765',
      imei2: '111222333444555',
      brand: 'iPhone',
      model: '13 Pro',
      type: 'reparacion',
      category: 'smartphone',
      color: 'Sierra Blue',
      capacity: '256GB',
      condition: 'bueno',
      repairReason: 'Pantalla rota, no enciende',
      status: 'en_reparacion',
      date: '2024-01-20',
      estimatedRepairTime: '3 días',
      repairCost: '250000',
      technician: 'Carlos Técnico',
      qrCode: 'EQ002',
      photos: [],
      warranty: 'Garantía de reparación',
      notes: 'Esperando repuestos'
    },
    {
      id: 3,
      imei1: '555666777888999',
      imei2: '666777888999000',
      brand: 'Xiaomi',
      model: 'Redmi Note 10',
      type: 'venta',
      category: 'smartphone',
      color: 'Onyx Gray',
      capacity: '64GB',
      condition: 'nuevo',
      clientName: 'Distribuidor ABC',
      clientPhone: '',
      clientEmail: '',
      distributorName: 'Distribuidor ABC',
      status: 'en_inventario',
      date: '2024-01-18',
      price: '450000',
      stockLevel: 15,
      minStockLevel: 5,
      qrCode: 'EQ003',
      photos: [],
      warranty: '12 meses',
      notes: 'Stock disponible para venta'
    },
    {
      id: 4,
      imei1: '111222333444555',
      imei2: '777888999000111',
      brand: 'Huawei',
      model: 'P30 Lite',
      type: 'compra',
      category: 'smartphone',
      color: 'Peacock Blue',
      capacity: '128GB',
      condition: 'usado',
      sellerName: 'María González',
      sellerPhone: '3009876543',
      sellerEmail: 'maria@email.com',
      sellerDocument: '12345678',
      purchasePrice: '450000',
      purchaseDate: '2024-01-22',
      status: 'en_inventario',
      date: '2024-01-22',
      stockLevel: 1,
      minStockLevel: 2,
      qrCode: 'EQ004',
      photos: [],
      warranty: '3 meses',
      notes: 'Equipo usado en buen estado'
    },
    {
      id: 5,
      imei1: '999888777666555',
      imei2: '888777666555444',
      brand: 'Motorola',
      model: 'G Power',
      type: 'compra',
      category: 'smartphone',
      color: 'Flash Gray',
      capacity: '32GB',
      condition: 'nuevo',
      sellerName: 'Carlos Rodríguez',
      sellerPhone: '3005554444',
      sellerEmail: 'carlos@email.com',
      sellerDocument: '87654321',
      purchasePrice: '320000',
      purchaseDate: '2024-01-23',
      status: 'en_inventario',
      date: '2024-01-23',
      stockLevel: 8,
      minStockLevel: 5,
      qrCode: 'EQ005',
      photos: [],
      warranty: '12 meses',
      notes: 'Equipo nuevo en caja'
    }
  ];

  const [filterType, setFilterType] = useState('todos');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [filterCategory, setFilterCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);


  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  // Categorías disponibles
  const categories = [
    'smartphone', 'tablet', 'laptop', 'smartwatch', 'accesorios', 'repuestos'
  ];



  // Usar datos del DataContext o datos de ejemplo si no hay datos
  const currentEquipment = equipment.length > 0 ? equipment : sampleEquipment;
  
  // Verificar alertas de stock
  const stockAlerts = currentEquipment.filter(item => 
    item.stockLevel <= item.minStockLevel && item.status === 'en_inventario'
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'vendido': return 'success';
      case 'en_reparacion': return 'warning';
      case 'entregado': return 'info';
      case 'pendiente': return 'error';
      case 'en_inventario': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'vendido': return 'Vendido';
      case 'en_reparacion': return 'En Reparación';
      case 'entregado': return 'Entregado';
      case 'pendiente': return 'Pendiente';
      case 'en_inventario': return 'En Inventario';
      default: return status;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'venta': return <Phone color="primary" />;
      case 'reparacion': return <Build color="secondary" />;
      case 'compra': return <ShoppingCart color="success" />;
      default: return <Phone color="primary" />;
    }
  };



  const getConditionColor = (condition) => {
    switch (condition) {
      case 'nuevo': return 'success';
      case 'excelente': return 'success';
      case 'bueno': return 'info';
      case 'regular': return 'warning';
      case 'malo': return 'error';
      case 'para repuestos': return 'error';
      default: return 'default';
    }
  };

  const getStockLevelColor = (stockLevel, minStockLevel) => {
    if (stockLevel === 0) return 'error';
    if (stockLevel <= minStockLevel) return 'warning';
    return 'success';
  };

  const filteredEquipment = currentEquipment.filter(item => {
    const matchesType = filterType === 'todos' || item.type === filterType;
    const matchesStatus = filterStatus === 'todos' || item.status === filterStatus;
    const matchesCategory = filterCategory === 'todos' || item.category === filterCategory;
    const matchesSearch = 
      item.imei1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.imei2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.clientName && item.clientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.sellerName && item.sellerName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesStatus && matchesCategory && matchesSearch;
  });

  const formatPrice = (price) => {
    if (!price) return '-';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleQRCode = (equipment) => {
    setSelectedEquipment(equipment);
    setQrDialogOpen(true);
  };

  const handleScanQR = () => {
    // Redirigir a la página de funciones móviles para escaneo QR
    navigate('/mobile-features');
  };

  const handleAddEquipment = () => {
    // Redirigir a la página de registro de equipos
    navigate('/user-register');
  };

  const handleStockAlert = (equipment) => {
    setSnackbar({
      open: true,
      message: `Stock bajo para ${equipment.brand} ${equipment.model}. Solo quedan ${equipment.stockLevel} unidades.`,
      severity: 'warning'
    });
  };

  const handleWhatsApp = (phone, message) => {
    const whatsappUrl = `https://wa.me/57${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Container maxWidth="xl">
      {/* Alertas de Stock */}
      {stockAlerts.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            ⚠️ Alertas de Stock Bajo
          </Typography>
          <Grid container spacing={1}>
            {stockAlerts.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Chip
                  icon={<Warning />}
                  label={`${item.brand} ${item.model}: ${item.stockLevel}/${item.minStockLevel}`}
                  color="warning"
                  onClick={() => handleStockAlert(item)}
                  sx={{ cursor: 'pointer' }}
                />
              </Grid>
            ))}
          </Grid>
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, mt: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            📱 Inventario Inteligente
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SyncStatus />
            <Box>
              <Button
                variant="outlined"
                startIcon={<QrCodeScanner />}
                onClick={handleScanQR}
                sx={{ mr: 1 }}
              >
                Escanear QR
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleAddEquipment}
              >
                Agregar Equipo
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Filtros Avanzados */}
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Tipo</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Tipo"
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="venta">Ventas</MenuItem>
                  <MenuItem value="reparacion">Reparaciones</MenuItem>
                  <MenuItem value="compra">Compras</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Estado</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Estado"
                >
                  <MenuItem value="todos">Todos</MenuItem>
                  <MenuItem value="vendido">Vendido</MenuItem>
                  <MenuItem value="en_reparacion">En Reparación</MenuItem>
                  <MenuItem value="entregado">Entregado</MenuItem>
                  <MenuItem value="pendiente">Pendiente</MenuItem>
                  <MenuItem value="en_inventario">En Inventario</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Categoría</InputLabel>
                <Select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  label="Categoría"
                >
                  <MenuItem value="todos">Todas</MenuItem>
                  {categories.map(cat => (
                    <MenuItem key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Buscar por IMEI, marca, modelo o cliente"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar..."
              />
            </Grid>
          </Grid>
        </Box>

        {/* Tabla de equipos mejorada */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>QR</TableCell>
                <TableCell>IMEI</TableCell>
                <TableCell>Equipo</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Precio</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEquipment.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleQRCode(item)}
                      sx={{ p: 0 }}
                    >
                      <QrCode color="primary" />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                        IMEI 1: {item.imei1}
                      </Typography>
                      {item.imei2 && (
                        <Typography variant="body2" fontFamily="monospace" color="textSecondary">
                          IMEI 2: {item.imei2}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="body2" fontWeight="bold">
                        {item.brand} {item.model}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={item.condition}
                          color={getConditionColor(item.condition)}
                          size="small"
                        />
                        <Typography variant="caption" color="textSecondary">
                          {item.color} • {item.capacity}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.category}
                      size="small"
                      icon={<Storage />}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {getTypeIcon(item.type)}
                      <Chip
                        label={getStatusText(item.status)}
                        color={getStatusColor(item.status)}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    {item.status === 'en_inventario' ? (
                      <Box>
                        <Typography variant="body2" fontWeight="bold">
                          {item.stockLevel}
                        </Typography>
                        <Chip
                          label={`Mín: ${item.minStockLevel}`}
                          color={getStockLevelColor(item.stockLevel, item.minStockLevel)}
                          size="small"
                          variant="outlined"
                        />
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.price ? (
                      <Typography variant="body2" fontWeight="bold" color="primary">
                        {formatPrice(item.price)}
                      </Typography>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        -
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Tooltip title="Ver detalles">
                        <IconButton size="small" color="primary">
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton size="small" color="secondary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="WhatsApp">
                        <IconButton 
                          size="small" 
                          color="success"
                          onClick={() => handleWhatsApp(
                            item.clientPhone || item.sellerPhone,
                            `Hola! Te contacto sobre el ${item.brand} ${item.model} (IMEI 1: ${item.imei1}${item.imei2 ? `, IMEI 2: ${item.imei2}` : ''})`
                          )}
                        >
                          <WhatsApp />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Resumen mejorado */}
        <Box sx={{ mt: 3, p: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            📊 Resumen del Inventario
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={6} md={2}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="primary">
                    {currentEquipment.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Equipos
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="success.main">
                    {currentEquipment.filter(item => item.type === 'venta').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ventas
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="warning.main">
                    {currentEquipment.filter(item => item.type === 'reparacion').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Reparaciones
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="info.main">
                    {currentEquipment.filter(item => item.status === 'en_inventario').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    En Inventario
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="error.main">
                    {stockAlerts.length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Alertas Stock
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={2}>
              <Card variant="outlined">
                <CardContent sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h4" color="secondary.main">
                    {currentEquipment.filter(item => item.category === 'smartphone').length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Smartphones
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Dialog para mostrar código QR */}
      <Dialog open={qrDialogOpen} onClose={() => setQrDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <QrCode color="primary" />
            Código QR - {selectedEquipment?.brand} {selectedEquipment?.model}
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', p: 2 }}>
            <QRCodeSVG 
              value={selectedEquipment?.qrCode || ''} 
              size={200}
              level="H"
            />
            <Typography variant="h6" sx={{ mt: 2 }}>
              {selectedEquipment?.qrCode}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              IMEI 1: {selectedEquipment?.imei1}
            </Typography>
            {selectedEquipment?.imei2 && (
              <Typography variant="body2" color="textSecondary">
                IMEI 2: {selectedEquipment?.imei2}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary">
              {selectedEquipment?.brand} {selectedEquipment?.model}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQrDialogOpen(false)}>Cerrar</Button>
          <Button 
            variant="contained" 
            startIcon={<Print />}
            onClick={() => window.print()}
          >
            Imprimir
          </Button>
        </DialogActions>
      </Dialog>

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

      {/* FAB para agregar equipo */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddEquipment}
      >
        <Add />
      </Fab>
    </Container>
  );
}

export default Inventory;
